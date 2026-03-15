from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import asyncio
from concurrent.futures import ThreadPoolExecutor

load_dotenv()

from contextlib import asynccontextmanager
from pdf_handler import extract_text_from_pdf, clean_extracted_text
from ai_handler import analyze_research_paper, answer_question, get_deep_section_analysis
from database import Database, save_paper_analysis, get_all_papers, save_chat_message, get_chat_history

# Models
class AskRequest(BaseModel):
    text: str
    question: str
    history: list = []
    paper_id: str = None

class DeepAnalyzeRequest(BaseModel):
    text: str
    section_name: str
    section_content: str

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await Database.connect()
    yield
    # Shutdown
    await Database.close()

app = FastAPI(title="Research Paper Explainer API", lifespan=lifespan)

# CORS Configuration
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

executor = ThreadPoolExecutor(max_workers=4)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Research Paper Explainer API (v1.2.0)."}

@app.post("/analyze")
async def analyze_pdf(files: list[UploadFile] = File(...)):
    results = []
    loop = asyncio.get_event_loop()
    
    for file in files:
        if file.content_type != "application/pdf":
            results.append({"error": f"Only PDF files are allowed. Skipped {file.filename}."})
            continue
            
        try:
            pdf_bytes = await file.read()
            
            # Use run_in_executor for CPU-bound PDF extraction
            raw_text = await loop.run_in_executor(executor, extract_text_from_pdf, pdf_bytes)
            
            if not raw_text.strip():
                results.append({"error": f"Could not extract text from {file.filename}."})
                continue
                
            cleaned_text = await loop.run_in_executor(executor, clean_extracted_text, raw_text)
            
            # Analyze with optimized async AI handler
            result = await analyze_research_paper(cleaned_text)
            result["original_filename"] = file.filename
            
            max_chars = 15000
            result["document_text"] = cleaned_text[:max_chars] if len(cleaned_text) > max_chars else cleaned_text
            
            # Save to MongoDB
            paper_id = await save_paper_analysis(result.copy())
            result["_id"] = paper_id
            
            results.append(result)
            
        except Exception as e:
            print(f"Error processing {file.filename}: {e}")
            results.append({"error": f"Failed to process {file.filename}: {str(e)}"})
            
    if not results:
        raise HTTPException(status_code=400, detail="No valid PDF files processed.")
              
    return {"status": "success", "data": results}

@app.post("/ask")
async def ask_question(request: AskRequest):
    if not request.text or not request.question:
        raise HTTPException(status_code=400, detail="Text and question required.")
        
    try:
        answer = await answer_question(request.text, request.question, request.history)
        
        # Save chat messages to DB if paper_id is provided
        if request.paper_id:
            await save_chat_message(request.paper_id, {"role": "user", "content": request.question})
            await save_chat_message(request.paper_id, {"role": "assistant", "content": answer})
            
        return {"status": "success", "answer": answer}
    except Exception as e:
        print(f"Error processing Q&A: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/deep-analyze")
async def deep_analyze(request: DeepAnalyzeRequest):
    if not request.text or not request.section_name:
        raise HTTPException(status_code=400, detail="Text and section name required.")
        
    try:
        analysis = await get_deep_section_analysis(request.text, request.section_name, request.section_content)
        return {"status": "success", "data": analysis}
    except Exception as e:
        print(f"Error in deep analysis: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history")
async def get_history():
    papers = await get_all_papers()
    return {"status": "success", "data": papers}

@app.get("/chat/{paper_id}")
async def get_chat(paper_id: str):
    history = await get_chat_history(paper_id)
    return {"status": "success", "data": history}

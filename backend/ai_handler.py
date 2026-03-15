import os
import json
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()

async def analyze_research_paper(text: str) -> dict:
    """
    Sends the extracted and cleaned research paper text to Groq
    and returns a structured JSON-like dict with the required sections.
    """
    api_key = os.getenv("GROQ_API_KEY")
    client = AsyncGroq(api_key=api_key)
    model = "llama-3.3-70b-versatile" 
    
    # Truncate text to avoid timeouts and token limits
    max_chars = 15000
    if len(text) > max_chars:
        text = text[:max_chars] + "\n\n... [Text truncated due to token limits] ..."
    
    prompt = f"""
    You are an AI research assistant.
    Analyze the research paper and explain it in a very clear, structured way for students and beginners.
    
    IMPORTANT RULES:
    * Return response ONLY in valid JSON.
    - Each section MUST have meaningful, "user understandable" matter (at least 3-6 sentences or multiple bullet points).
    - Use simple sentences. Avoid complex academic jargon.
    - If a section is normally a list, provide a list of clear, explanatory points.

    JSON Structure:
    {{
      "title": "The full title of the paper",
      "executive_briefing": "A 2-3 sentence high-level summary of the paper's core essence",
      "summary": "A clear, concise abstract/summary of the entire paper (at least 5 sentences)",
      "important_points": ["Key takeaway 1 with explanation", "Key takeaway 2 with explanation", "Critical insight 3 with explanation"],
      "key_findings": ["Finding 1: detailed explanation", "Finding 2: detailed explanation"],
      "objectives": "Detailed explanation of the main goals or objectives (4-5 sentences)",
      "problem_statement": "The main problem the paper is trying to solve in simple terms (4-5 sentences)",
      "methodology": "The method, proposed solution, or algorithm used, explained simply (5-6 sentences)",
      "methods": ["Step 1: what was done and why", "Step 2: what was done and why"],
      "subjects_and_statistics": "Detailed summary of subjects, participants, and statistical methods used",
      "study_compliance": "Information on study compliance, protocols, and standards followed",
      "abstract_detailed": "A detailed, structured version of the abstract for beginners",
      "figures_summary": "Description of key figures and tables and what they represent",
      "introduction": "Summary of the introduction and background context",
      "results_detailed": "Extensive, understandable details on the research results",
      "discussion": "Summary of the discussion and interpretation of findings in simple terms",
      "ethical_approval": "Details on ethical approvals, consent, and institutional review",
      "acknowledgements": "Recognition of contributors and funding sources",
      "competing_interests": "Disclosure of any competing or conflicting interests",
      "supplementary_info": "Summary of any supplementary materials or data",
      "references": [
        {{ "title": "Reference Paper 1", "publisher": "Publisher Name", "info": "Why this is relevant to the current paper" }}
      ],
      "key_concepts": ["Concept 1: definition", "Concept 2: definition"],
      "dig_deeper": "A section providing more technical depth or context for advanced readers",
      "research_comparison": "How this research compares to existing work in the field",
      "limitations": ["Limitation 1 with explanation", "Limitation 2 with explanation"],
      "future_work": ["Future idea 1 with explanation", "Future idea 2 with explanation"],
      "practical_applications": "Detailed real-world uses or implementations of this research",
      "technologies_used": ["Tech 1: how it was used", "Tech 2: how it was used"],
      "key_contributions": ["Contribution 1: simple explanation", "Contribution 2: simple explanation"],
      "conclusions": "Detailed final conclusions and closing statements (5-6 sentences)",
      "insights": {{
        "field_of_study": "e.g. NLP", "difficulty_level": "Beginner/Advanced", "dataset_used": "Name", "model_type": "Name",
        "key_contribution": "1-sentence unique contribution",
        "num_pages": 0, "num_figures": 0, "num_tables": 0, "num_references": 0, "num_algorithms": 0,
        "topics": ["Topic 1", "Topic 2"]
      }},
      "workflow": [
        {{ "step": "Step Name", "description": "Simple explanation of the step", "reference": "Original text snippet", "phase": "Planning/Data/Model/Evaluation/Conclusion" }}
      ]
    }}
    
    Text: {text}
    """
    
    try:
        chat_completion = await client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=model,
            response_format={"type": "json_object"},
        )
        
        response_text = chat_completion.choices[0].message.content.strip()
        return json.loads(response_text)
    except Exception as e:
        print(f"Error during AI analysis: {str(e)}")
        raise Exception(f"Failed to generate structured analysis: {str(e)}")

async def answer_question(text: str, question: str, history: list = None) -> str:
    """
    Answers a specific user question based ONLY on the provided research paper text.
    """
    api_key = os.getenv("GROQ_API_KEY")
    client = AsyncGroq(api_key=api_key)
    model = "llama-3.3-70b-versatile" 
    
    system_prompt = f"""
    You are an expert academic assistant. Answer questions about the provided research paper.
    Return answers ONLY in concise bullet points.
    
    Paper Text:
    {text}
    """
    
    messages = [{"role": "system", "content": system_prompt}]
    if history:
        for msg in history:
            messages.append({"role": msg.get("role", "user"), "content": msg.get("content", "")})
    messages.append({"role": "user", "content": question})
    
    try:
        chat_completion = await client.chat.completions.create(
            messages=messages,
            model=model,
        )
        return chat_completion.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error during Q&A: {str(e)}")
        raise Exception(f"Failed to generate an answer: {str(e)}")

async def get_deep_section_analysis(text: str, section_name: str, section_content: str):
    """
    Generates a deep, structured analysis for a specific section.
    """
    api_key = os.getenv("GROQ_API_KEY")
    client = AsyncGroq(api_key=api_key)
    
    # Specialized prompt for Figures
    if section_name.lower() in ["figures_summary", "figures", "figures summary"]:
        prompt = f"""
        You are an AI research expert. Provide a DEEP, structured explanation of the figures in this research paper.
        
        Rules:
        - Format: VALID JSON.
        - Style: Detailed but understandable for students.
        - Content: Explain each figure/table mentioned in the 'Figures Summary' context or the full text.
        
        Required JSON Structure:
        {{
          "deep_insights": [
            {{
              "title": "Figure/Table Name (e.g. Figure 1 - Architecture)",
              "explanation": "Detailed description of what this figure represents (3-4 sentences)",
              "components": ["Component A: description", "Component B: description"],
              "demonstrates": "What exactly this figure demonstrates in the research context",
              "importance": "Why this specific visualization is critical for understanding the paper",
              "simplified_explanation": "A very simple, one-sentence analogy or explanation for beginners"
            }}
          ],
          "related_concepts": ["Concept 1 with brief 1-sentence explanation", "Concept 2", "Concept 3"],
          "bottom_line": "One clear sentence on what a student should remember from this section"
        }}
        
        Context regarding this section: {section_content}
        Full Paper Text: {text[:8000]} # Using a large chunk for context
        """
    else:
        # General deep analysis for other sections
        prompt = f"""
        You are an AI research expert. Provide a DEEP, structured expansion for the '{section_name}' section.
        
        Rules:
        - Format: VALID JSON.
        - Style: Deep, analytical, and highly educational.
        
        Required JSON Structure:
        {{
          "deep_insights": [
            {{
              "title": "Sub-topic or key point",
              "explanation": "Extensive 4-5 sentence explanation of this point",
              "importance": "Why this matters in the larger context"
            }}
          ],
          "key_takeaways": ["Takeaway 1", "Takeaway 2"],
          "educational_analogy": "A simple analogy to help a student understand this concept"
        }}
        
        Section Header: {section_name}
        Context regarding this section: {section_content}
        Full Paper Text: {text[:8000]}
        """

    try:
        response = await client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a research expert. Respond with valid JSON only."},
                {"role": "user", "content": prompt}
            ],
            response_format={ "type": "json_object" },
            temperature=0.3,
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"Error in deep analysis: {e}")
        return {"error": "Failed to generate deep analysis"}

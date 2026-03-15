import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

try:
    models = client.models.list()
    working_models = []
    blocked_models = []
    
    print("Testing models...")
    for model in models.data:
        # Skip non-text models
        if "whisper" in model.id or "guard" in model.id or "vision" in model.id:
            continue
            
        try:
            chat_completion = client.chat.completions.create(
                messages=[{"role": "user", "content": "Hi"}],
                model=model.id,
                max_tokens=5
            )
            print(f"[OK] {model.id}")
            working_models.append(model.id)
        except Exception as e:
            error_msg = str(e)
            if "blocked" in error_msg:
                print(f"[BLOCKED] {model.id}")
                blocked_models.append(model.id)
            elif "decommissioned" in error_msg:
                print(f"[DECOMMISSIONED] {model.id}")
            else:
                print(f"[ERROR] {model.id}: {error_msg}")
                
    print("\nSummary:")
    print(f"Working: {working_models}")
    print(f"Blocked: {blocked_models}")

except Exception as e:
    print(f"Error: {e}")

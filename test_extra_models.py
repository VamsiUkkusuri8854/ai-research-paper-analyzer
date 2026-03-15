import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

models_to_try = [
    "llama-3.2-1b-preview",
    "llama-3.2-3b-preview",
    "llama-3.2-11b-vision-preview",
    "openai/gpt-oss-safeguard-20b",
    "meta-llama/llama-prompt-guard-2-86m",
    "meta-llama/llama-guard-4-12b",
    "llama3-70b-8192",
    "llama3-8b-8192"
]

print("Testing specific extra models...")
for model_id in models_to_try:
    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": "Hi"}],
            model=model_id,
            max_tokens=5
        )
        print(f"[OK] {model_id}")
    except Exception as e:
        print(f"[ERROR] {model_id}: {str(e)}")

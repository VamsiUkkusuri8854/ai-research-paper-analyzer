import os
from groq import Groq
from dotenv import load_dotenv
import json

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

try:
    print("Fetching raw model list...")
    models = client.models.list()
    
    # Try EVERY model without filtering
    for model in models.data:
        print(f"Testing {model.id}...", end=" ", flush=True)
        try:
            chat_completion = client.chat.completions.create(
                messages=[{"role": "user", "content": "Hi"}],
                model=model.id,
                max_tokens=2
            )
            print("WORKING!")
        except Exception as e:
            msg = str(e)
            if "blocked" in msg:
                 print("Blocked")
            elif "decommissioned" in msg:
                 print("Decommissioned")
            elif "terms" in msg:
                 print("Terms Required")
            elif "not found" in msg.lower():
                 print("Not Found")
            else:
                 print(f"Error: {msg[:50]}...")
except Exception as e:
    print(f"General Error: {e}")

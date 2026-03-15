import requests

url = 'http://localhost:8000/analyze'
file_path = r'd:\reasearch_papers\test_sample_paper.pdf'

try:
    with open(file_path, 'rb') as f:
        print(f"Sending {file_path} to {url}...")
        response = requests.post(url, files={'files': ('file.pdf', f, 'application/pdf')})
        
    print(f"Status Code: {response.status_code}")
    print("Response JSON:")
    print(response.json())
except Exception as e:
    print(f"Error testing API: {e}")

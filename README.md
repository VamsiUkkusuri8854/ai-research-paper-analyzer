# AI Research Paper Analyzer

AI-powered Research Paper Analyzer that transforms complex academic papers into simplified insights, visual workflows, and interactive Q&A for better understanding.

## Prerequisites

- **Python 3.8+**
- **Node.js 18+**
- **MongoDB Atlas Account**
- **Groq API Key** (for fast AI processing)

## 🚀 Getting Started

### 1. Backend Setup

Navigate to the `backend` directory:
```bash
cd backend
```

Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Set up your environment variables:
- Rename `.env.example` to `.env`.
- Add your `GROQ_API_KEY` and `MONGODB_URI`.

Run the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend Setup

Navigate to the `frontend` directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

## 🛠 Features

- **Dynamic Workflow Generation**: Automatically extracts 6-10 validated research stages from papers.
- **AI Project Mentor**: Interactive chat that provides step-by-step implementation guidance for each workflow node.
- **Voice Assistant**: Ask questions using your voice via the microphone button.
- **Large Document Support**: Processes 10MB+ PDFs using semantic chunking.
- **Themed UI**: Modern, glassmorphism design with auto-light/dark mode support.

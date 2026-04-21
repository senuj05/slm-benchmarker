# Local SLM Benchmarker

A web app for benchmarking and comparing local small language models (SLMs) running via Ollama.

## Features

- Chat with local AI models (Mistral, LLaMA 3.2, Phi-4-Mini)
- Real-time benchmark metrics: tokens/second, time to first token, memory usage
- Compare all 3 models side by side with the same prompt
- Ollama connection status indicator

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, FastAPI
- **AI Runtime:** Ollama

## Setup

### Prerequisites

- [Ollama](https://ollama.com) installed and running
- Python 3.9+
- The following models pulled in Ollama:
  ```
  ollama pull mistral
  ollama pull llama3.2:3b
  ollama pull phi4-mini
  ```

### Install dependencies

```
pip3 install -r requirements.txt
```

### Run the backend

```
python3 -m uvicorn backend.app:app --reload
```

### Open the frontend

Open `frontend/index.html` in your browser using Live Server (VS Code extension).

## Usage

1. Select a model from the sidebar
2. Type a prompt and hit send
3. View the AI response and benchmark metrics
4. Click **Compare All 3** to run the same prompt across all models

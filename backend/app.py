from fastapi import FastAPI
from pydantic import BaseModel
from backend.ollama_client import call_model 
from backend.models import BenchmarkResponse, ModelMetrics


# create an instance of the FASTAPI app
app= FastAPI()

# implement CRUD operations for the API

# Define the request body for the API
class PromptRequest(BaseModel):
    model_name: str
    user_prompt: str

@app.get("/")
async def root():
    return {"message": "Welcome to the SLM Benchmarking API."}


# POST route
@app.post("/benchmark")
async def benchmark(request: PromptRequest):
    return call_model( request.model_name, request.user_prompt)
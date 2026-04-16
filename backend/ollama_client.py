import json         # For parsing JSON responses
import os           # For accessing environment variables
import psutil       # For monitoring system resources (ex: memoru usage)
import ollama       # Ollama client library

from backend.models import BenchmarkResponse, ModelMetrics

# Add the sysytem prompt

JSON_SYSTEM_PROMPT = """ You are a helpful assistant. 
You MUST respond  only with  a valid JSON object in the exact format :
{
    "answer" : "<your answer here>",
    "confidence" : "<high/medium/low>",
    "word_count": <number of words in the answer>
}
"""

# Implement the function to call the model and get the response

def call_model(model_name: str, user_prompt: str):
    """
    Send a prompt to the ollama model and return the response content
    """

    response = ollama.chat(
        model = model_name,
        messages= [
            {"role": "system", "content": JSON_SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ]
    )
    
    raw_text = response ["message"]["content"]

    # Fix word count: Since the model is smaller the accracy of the model 
    # response is low
    try:
        parsed = json.loads(raw_text)
        parsed["word_count"] = len(parsed["answer"].split())
        raw_text = json.dumps(parsed)
    except:
        pass

    return raw_text



if __name__ == "__main__":
    result = call_model("llama3.2:3b", "What is the for loop and while loop?")
    parsed= json.loads(result)
    print(json.dumps(parsed, indent=2))

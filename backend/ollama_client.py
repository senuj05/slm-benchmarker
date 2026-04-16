import json         # For parsing JSON responses
import os           # For accessing environment variables
import psutil       # For monitoring system resources (ex: memoru usage)
import ollama       # Ollama client library
import time         # To measure the response time of the model

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
    start_time = time.time() # start the timer to measure the reponse time
    memory_before = psutil.virtual_memory().used / (1024 * 1024) # memory usage before the call in Megabytes

    response = ollama.chat(
        model = model_name,
        messages= [
            {"role": "system", "content": JSON_SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ]
    )
    
    raw_text = response ["message"]["content"]
    
    # measure the time to first token and memory used after the response
    end_time = time.time() # end of the response
    time_to_first_token = end_time - start_time
    
    # Memory used after the call in Megabytes
    memory_after =psutil.virtual_memory().used / (1024 * 1024)
    memory_used = memory_after - memory_before

    # Calculating tokens per second
    total_tokens = len(raw_text.split())
    tokens_per_second = total_tokens / time_to_first_token if time_to_first_token > 0 else 0

    # Fix word count: Since the model is smaller the accracy of the model 
    # response is low
    try:
        parsed = json.loads(raw_text)
        parsed["word_count"] = len(parsed["answer"].split())
        raw_text = json.dumps(parsed)
    except:
        pass

    model_metrics = ModelMetrics(
        model_name = model_name,
        tokens_per_second = tokens_per_second,
        time_to_first_token = time_to_first_token,
        memory_used_mb = memory_used,
        prompt_used= user_prompt,
        raw_response = raw_text
    ) 

    return model_metrics.model_dump_json() # return the response as a json string






if __name__ == "__main__":
    # Example usage
    model_name = "llama3.2:3b"
    user_prompt = "What is the capital of France?"
    response = call_model(model_name, user_prompt)
    print(response)

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from youtubesearchpython import VideosSearch
from typing import Optional

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the Qwen2 model
model_name = "Qwen/Qwen2-0.5B"
tokenizer = AutoTokenizer.from_pretrained(
    model_name,
    trust_remote_code=True
)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    trust_remote_code=True
).eval()

# Sample context for educational questions
EDUCATION_CONTEXT = """
Tamil Nadu is a state in southern India. Its capital is Chennai, formerly known as Madras. 
Chennai is located on the Coromandel Coast of the Bay of Bengal. It is the largest city in Tamil Nadu and the fourth-largest city in India.
Tamil Nadu has a rich cultural heritage and is known for its temples, classical dance, and music.
"""

class ChatRequest(BaseModel):
    message: str

class YouTubeSearch(BaseModel):
    query: str

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # Prepare the input with proper formatting
        input_text = f"<|im_start|>system\nYou are a helpful educational assistant. Provide clear, complete, and accurate responses to educational questions.<|im_end|>\n<|im_start|>user\n{request.message}<|im_end|>\n<|im_start|>assistant\n"
        
        # Generate response with adjusted parameters
        inputs = tokenizer(input_text, return_tensors="pt", padding=True, truncation=True, max_length=512).to(model.device)
        
        # Generate with more lenient parameters
        outputs = model.generate(
            **inputs,
            max_new_tokens=512,  # Increased from 256
            min_new_tokens=50,   # Added minimum tokens
            temperature=0.7,     # Slightly increased for more natural responses
            do_sample=True,      # Enable sampling for more diverse responses
            top_p=0.9,           # Added top-p sampling
            repetition_penalty=1.2,  # Added to reduce repetition
            pad_token_id=tokenizer.pad_token_id,
            eos_token_id=tokenizer.eos_token_id
        )
        
        # Decode the full response
        full_response = tokenizer.decode(outputs[0], skip_special_tokens=False)
        
        # Extract only the assistant's response
        start_marker = "<|im_start|>assistant\n"
        end_marker = "<|im_end|>"
        
        start_idx = full_response.find(start_marker)
        if start_idx != -1:
            start_idx += len(start_marker)
            end_idx = full_response.find(end_marker, start_idx)
            if end_idx != -1:
                response = full_response[start_idx:end_idx].strip()
            else:
                response = full_response[start_idx:].strip()
        else:
            response = full_response.strip()
        
        # Clean up any remaining special tokens
        response = response.replace("<|im_start|>", "").replace("<|im_end|>", "").strip()
        
        return {"reply": response}
    except Exception as e:
        print(f"Error in chat: {str(e)}")
        return {"reply": "I apologize, but I encountered an error while processing your request. Please try again."}

@app.post("/youtube-search")
async def youtube_search(search: YouTubeSearch):
    try:
        search = VideosSearch(search.query, limit=1)
        results = search.result()
        if results['result']:
            return {"link": results['result'][0]['link']}
        return {"link": "No video found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 
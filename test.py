from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# Load the tokenizer and model
model_name = "Qwen/Qwen2-0.5B"
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(model_name, trust_remote_code=True).eval()

# Use GPU if available
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)

# Chat function
def chat():
    print("Qwen2 Chatbot (type 'exit' to quit)")
    history = ""
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break

        prompt = history + f"User: {user_input}\nAssistant:"
        inputs = tokenizer(prompt, return_tensors="pt").to(device)
        outputs = model.generate(
            **inputs,
            max_new_tokens=100,
            do_sample=True,
            temperature=0.7,
            pad_token_id=tokenizer.eos_token_id
        )
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        reply = response[len(prompt):].strip().split("\n")[0]

        print(f"Bot: {reply}")
        history += f"User: {user_input}\nAssistant: {reply}\n"

chat()

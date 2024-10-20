from flask import Flask, request, jsonify, send_file
import json
import re
from huggingface_hub import InferenceClient
from transformers import GPT2Tokenizer
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()

api_key = os.getenv("HUGGING_FACE_API_KEY")
if api_key is None:
    raise ValueError("Hugging Face API key not found. Please set it in the .env file.")

client = InferenceClient(token=api_key)

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

MAX_INPUT_TOKENS = 6500

def truncate_text_by_tokens(text, max_tokens=MAX_INPUT_TOKENS):
    tokens = tokenizer.encode(text)
    if len(tokens) > max_tokens:
        truncated_tokens = tokens[:max_tokens]
        truncated_text = tokenizer.decode(truncated_tokens)
        return truncated_text
    return text

def get_llama_response(prompt):
    response = client.text_generation(
        prompt=prompt,
        model="meta-llama/Meta-Llama-3-8B-Instruct",
        max_new_tokens=150
    )
    return response

def clean_text(raw_text):
    cleaned_text = re.sub(r'<[^>]+>', '', raw_text)
    cleaned_text = re.sub(r'[^a-zA-Z0-9.,\s]', '', cleaned_text)
    cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()
    return cleaned_text

def load_and_clean_json(json_data):
    try:
        all_text = " ".join([item.get('text', '') for item in json_data])
        cleaned_text = clean_text(all_text)
        return cleaned_text
    except Exception as e:
        raise ValueError(f"Error loading JSON data: {e}")

def generate_dynamic_prompt(companies, feature):
    if not companies:
        return ""
    companies_str = ", ".join(companies)
    prompts = {
        "Revenue and Profit Comparison": f"Compare the revenue and profit of {companies_str} over the last few years. Present the revenue, profit, and growth rates in a table for each company, followed by key bullet points summarizing the differences.",
        "Store and Geographic Distribution": f"Compare the total number of stores opened by {companies_str}, along with their geographic distribution. Display the store counts and locations in a table and provide bullet points summarizing geographic trends.",
        "Growth in Financial Metrics": f"Analyze the year-over-year growth in revenue, profit, and key financial metrics for {companies_str}. Present the data in a table and include bullet points highlighting major trends.",
        "Product Portfolio Comparison": f"Compare the product portfolios of {companies_str}, focusing on the number of products, revenue from each category, and percentage breakdowns. Use a table for the quantitative comparison and add bullet points for trends or strategies.",
        "Financial Highlights": f"List the financial highlights (revenue, net profit, EBITDA, key ratios) for {companies_str} in a table. Provide bullet points summarizing the financial health of each company.",
        "Year-Over-Year Growth in Sales, Profits, and Store Expansions": f"Compare the year-over-year growth in sales, profits, and store expansions for {companies_str}. Show the data in a table and provide bullet points summarizing significant changes.",
        "Supply Chain Metrics Comparison": f"Summarize the supply chain metrics for {companies_str}, including the number of suppliers, delivery times, and other key metrics. Present the data in a table and summarize key differences in bullet points.",
        "Technology and Innovation": f"Compare the role of technology in {companies_str}, focusing on metrics such as efficiency improvements and sales growth driven by technology. Use bullet points to summarize the impact of technology.",
        "Other Performance Metrics": f"Summarize other performance metrics, such as customer satisfaction scores, return rates, and operational efficiency for {companies_str}. Present the data in a table and include bullet points highlighting key differences."
    }
    return prompts.get(feature, "")

def analyze_text(text, companies_selected, features_selected):
    responses = {}
    truncated_text = truncate_text_by_tokens(text)
    for feature in features_selected:
        prompt = generate_dynamic_prompt(companies_selected, feature)
        if prompt:
            question_with_context = f"{truncated_text}\n\n{prompt}"
            response = get_llama_response(question_with_context)
            responses[feature] = response
    return responses

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        companies = data.get('companies', [])
        features = data.get('features', [])
        json_data = data.get('json_data', [])
        
        if not companies or not features or not json_data:
            return jsonify({"error": "Please provide companies, features, and JSON data"}), 400
        
        cleaned_text = load_and_clean_json(json_data)
        
        analysis_output = analyze_text(cleaned_text, companies, features)
        
        output_filename = 'analysis_output.json'
        with open(output_filename, 'w') as f:
            json.dump(analysis_output, f, indent=4)
        
        return send_file(output_filename, as_attachment=True)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '_main_':
    app.run(debug=True,port=5000)
from flask import Flask, request, jsonify,json
from webscrape import scrape_website
from pdfscrape import download_pdf,extract_pdf_text
import requests,os
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
API_KEY = os.getenv('API_KEY')
SEARCH_ENGINE_ID = os.getenv('SEARCH_ENGINE_ID')
url = 'https://www.googleapis.com/customsearch/v1'

@app.route('/company', methods=['POST'])
def company():
    data = request.json
    search_queries = data.get('q', []) 
    num_results = data.get('num', 1)
    isPdf = data.get('isPdf')
    print(search_queries,isPdf)
    

    all_links = []

    try:
        for search_query in search_queries:
            response = requests.get(url, params={
                'q': f"{search_query} -dynamic -javascript -pdf",
                'key': API_KEY,
                'cx': SEARCH_ENGINE_ID,
                'num': num_results,
                'fileType': 'pdf' if isPdf else None
            })
            
            results = response.json().get('items', [])
            links = [item['link'] for item in results]
            all_links.extend(links)  
            if len(all_links) == 0:
                print("no results fetched")
            else :
                print(all_links)
            
        return jsonify(all_links)
    
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500

    
@app.route('/webscrape', methods=['POST'])
def scrape_endpoint():
    data = request.json
    urls = data.get('urls')
    print(f"data from front end is {urls}")
    output_json_file = 'webscraped_data.json'
    
    all_scraped_data = [] 

    try:
        for url in urls:
            scrape_data = scrape_website(url)  
            all_scraped_data.append({'url': url, 'data': scrape_data})
        print(f"scrapped data from server is {all_scraped_data}")
        with open(output_json_file, 'w', encoding='utf-8') as json_file:
            json.dump(all_scraped_data, json_file, ensure_ascii=False, indent=4)

        return jsonify({'message': 'Scraping completed successfully!', 'output_file': output_json_file, 'data': all_scraped_data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/pdfscrape', methods=['POST'])
def pdfscrape():
    data = request.json
    pdf_urls = data.get('urls')
    print(f"data from front end (pdf) {pdfscrape}")
    combined_data = []

    output_json_file = 'pdfscraped_data.json'
    
    if os.path.exists(output_json_file):
        
        with open(output_json_file, 'r', encoding='utf-8') as json_file:
            existing_data = json.load(json_file)
    else:
        existing_data = []

    for index, pdf_url in enumerate(pdf_urls):
        local_pdf_file = f'downloaded_pdf_{index + 1}.pdf' 
        try:
            download_pdf(pdf_url, local_pdf_file)
            pdf_text = extract_pdf_text(local_pdf_file)
            combined_data.extend(pdf_text)
        except Exception as e:
            return jsonify({'error': f'Failed to process {pdf_url}: {str(e)}'}), 500

    combined_data = existing_data + combined_data

    with open(output_json_file, 'w', encoding='utf-8') as json_file:
        json.dump(combined_data, json_file, ensure_ascii=False, indent=4)

    return jsonify({'message': 'PDF scraping completed successfully!', 'output_file': output_json_file}), 200
if __name__ == '__main__':
    app.run(debug=True)
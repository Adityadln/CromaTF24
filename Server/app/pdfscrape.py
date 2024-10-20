import PyPDF2,json,os,requests

output_json_file = 'extracted_text.json'

def download_pdf(url, local_filename):
    with requests.get(url, stream=True) as r:
        r.raise_for_status() 
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
    return local_filename

def extract_pdf_text(pdf_file, output_json_file):
    if os.path.exists(output_json_file):
        with open(output_json_file, 'r', encoding='utf-8') as json_file:
            existing_data = json.load(json_file)
    else:
        existing_data = []

    new_pdf_text = []

    with open(pdf_file, 'rb') as file:
        reader = PyPDF2.PdfReader(file)

        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text = page.extract_text()
            
            new_pdf_text.append({
                'page': page_num + 1,
                'text': text
            })

    combined_data = existing_data + new_pdf_text

    with open(output_json_file, 'w', encoding='utf-8') as json_file:
        json.dump(combined_data, json_file, ensure_ascii=False, indent=4)


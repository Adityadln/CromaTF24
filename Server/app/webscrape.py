from selenium import webdriver
from bs4 import BeautifulSoup
import json ,os

def scrape_website(urls, output_file):
    print("scrapping website function called")
    driver = webdriver.Chrome()

    try:
        all_extracted_data = []

        for url in urls:
            driver.get(url) 
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')

            paragraphs = soup.find_all('p')
            extracted_data = [para.get_text() for para in paragraphs]
            all_extracted_data.extend(extracted_data)  
        print(f"the extracted data is {all_extracted_data}")
        if os.path.exists(output_file):
            with open(output_file, 'r', encoding='utf-8') as json_file:
                existing_data = json.load(json_file)
        else:
            existing_data = []
        existing_entries = set(entry['data'] for entry in existing_data)
        

        for text in extracted_data:
            if text not in existing_entries:  
                existing_data.append({'data': text})

        with open(output_file, 'w', encoding='utf-8') as json_file:
            json.dump(existing_data, json_file, ensure_ascii=False, indent=4)

        print(f'Data scraped and saved to {output_file}')
    
    finally:
        driver.quit()


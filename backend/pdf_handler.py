import pymupdf
import re

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """
    Extracts text from a PDF file provided as bytes.
    Cleans up basic formatting and empty lines.
    """
    try:
        doc = pymupdf.open(stream=pdf_bytes, filetype="pdf")
        full_text = []
        for page_num in range(len(doc)):
            page = doc[page_num]
            text = page.get_text()
            # Basic cleaning: remove extra whitespace and newlines
            text = re.sub(r'\s+', ' ', text).strip()
            full_text.append(text)
            
        doc.close()
        return "\n\n".join(full_text)
    except Exception as e:
        print(f"Error extracting text from PDF: {str(e)}")
        raise e

def clean_extracted_text(text: str) -> str:
    """
    Cleans the extracted text further, removing common unnecessary sections
    like references if identifiable, and standardizing spaces.
    """
    # Simple heuristic to trim after 'References' or 'Bibliography'
    # Many papers end with these. This is very basic and could be improved.
    reference_keywords = [r"\nReferences\b", r"\nBibliography\b", r"\nREFERENCES\b", r"\nBIBLIOGRAPHY\b"]
    
    cleaned_text = text
    for keyword in reference_keywords:
        match = re.search(keyword, cleaned_text)
        if match:
            # Cut off everything after the first matching 'References' section
            cleaned_text = cleaned_text[:match.start()]
            break
            
    # Remove any remaining weird characters or unusual spacing
    cleaned_text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\xff]', '', cleaned_text)
    
    return cleaned_text.strip()

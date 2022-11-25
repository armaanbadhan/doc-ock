import base64
import pickle
import pytesseract
import cv2
import numpy as np
import re
import pandas as pd
from PIL import Image
from pdf2image import convert_from_path


mapping = {
    'address_proof': 0,
    'bank_statements': 1,
    'business_proof': 2,
    'employment_proof': 3,
    'fund_raising': 4,
    'identity_proof': 5,
    'invoices': 6,
    'personal_finance_statement': 7,
    'power_of_attorney': 8,
    'receipts': 9,
    'salary_slip': 10,
    'tax_return': 11
}

i = 0

path_to_tes = "C:\\Users\\91947\Desktop\\Tesseract-OCR\\tesseract.exe"
pytesseract.pytesseract.tesseract_cmd = path_to_tes


model = pickle.load(open("C:/Users/91947/Desktop/stgi-hacky/doc-ock/models/lsvm_model.pkl", "rb"))

def pdf(pdf_base64):
    global i
    i += 1
    decoded_data = base64.b64decode(pdf_base64)
    path_to_pdf = "C:/Users/91947/Desktop/stgi-hacky/doc-ock/temp/"
    with open(f"C:/Users/91947/Desktop/stgi-hacky/doc-ock/temp/{i}.pdf", 'wb') as pdf:
        pdf.write(decoded_data)
    
    kk = convert_from_path(path_to_pdf + f"{i}.pdf", poppler_path="C:/Users/91947/Downloads/poppler-22.11.0/Library/bin")

    res = []
    for img in kk:
        
        res.append(pytesseract.image_to_string(np.array(img)))
        res.append(" ")
    s = "".join(res)
    s.strip()
    s = re.sub('\n', '', s)
    s = ' ' + s + '\n'
    a = model.predict(pd.Series(s))
    return str(mapping[a[0]])


def for_jpegs(jpeg_base64):
    decoded_data = base64.b64decode(jpeg_base64)
    np_data = np.fromstring(decoded_data,np.uint8)
    img = cv2.imdecode(np_data,cv2.IMREAD_UNCHANGED)

    s = pytesseract.image_to_string(img)
    s.strip()
    s = re.sub('\n', ' ', s)
    a = model.predict(pd.Series(s))
    return str(mapping[a[0]])


def for_webp(webp_base64):
    decoded_data = base64.b64decode(webp_base64)
    np_data = np.fromstring(decoded_data,np.uint8)
    img = cv2.imdecode(np_data,cv2.IMREAD_UNCHANGED)

    im = Image.fromarray(img.astype('uint8'), 'RGB')
    im = im.convert("RGB")

    img = np.array(im)

    s = pytesseract.image_to_string(img)
    s.strip()
    s = re.sub('\n', ' ', s)

    a = model.predict(pd.Series(s))
    return str(mapping[a[0]])


def run_model_here(filedata) -> str:    # input base64, output prediction
    meta, base64str = filedata.split(",")
    file_type = meta.split("/")[1].split(";")[0]
    print(file_type, base64str[:20])
    if file_type == "pdf":
        return pdf(base64str)
    elif file_type in {"jpeg", "jpg", "png"}:
        return for_jpegs(base64str)
    elif file_type == "jfif":
        return '-1'
    elif file_type == "webp":
        return for_webp(base64str)
    return '-2'

if __name__ == "__main__":
    with open("C:/Users/91947/Desktop/Income-Tax-Form-Sample.webp", 'rb') as fi:
        blob = fi.read().strip()
    print(for_webp(base64.b64encode(blob)))

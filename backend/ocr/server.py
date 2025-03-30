from fastapi import FastAPI, UploadFile
from transformers import pipeline
from PIL import Image
import io
import os
import parse


if not os.path.isdir('model'):
    pipe = pipeline("image-to-text", model="selvakumarcts/sk_invoice_receipts")
    pipe.save_pretrained('model')
else:
    pipe = pipeline('image-to-text', 'model')

app = FastAPI()


# Return a test reponse
@app.get('/')
async def root():
    return {'message': 'Hello World'}


# Extract important receipt info from an image
@app.post("/extract-receipt-info/")
async def create_upload_file(file: UploadFile):

    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))

    xml_receipt_extraction =  pipe(images=image)[0]['generated_text']
    dict_receipt_extraction = parse.receipt_xml_to_dict(xml_receipt_extraction)

    return {"filename": file.filename, 'data': dict_receipt_extraction}

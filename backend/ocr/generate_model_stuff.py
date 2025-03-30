from model import pipe
import parse_xml
import os
import json


jpg_files = ['test_images/'+f for f in os.listdir('test_images') if f.endswith('.jpg')][:10]

jpg_files=['test_images/1179-receipt.jpg']

xml_receipt_extraction =  [x[0]['generated_text'] for x in pipe(images=jpg_files)]
dict_receipt_extraction = [parse_xml.receipt_xml_to_dict(x) for x in xml_receipt_extraction]


for x in zip(jpg_files, dict_receipt_extraction):
    wrap_dict = {'file_name': x[0], 'expected': x[1]}
    print(json.dumps(wrap_dict) + ',')
    


import requests
import sys
import json


args = sys.argv[1:]

files = {"file": (args[0], open(f"{args[0]}", "rb"), "image/jpeg")}
url = 'http://127.0.0.1:8001/extract-receipt-info/'
response = requests.post(url, files=files)

print(response.text)


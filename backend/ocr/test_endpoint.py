import requests

files = {"file": ("1002-receipt.jpg", open("./test_images/1016-receipt.jpg", "rb"), "image/jpeg")}
url = 'http://127.0.0.1:8001/extract-receipt-info/'
response = requests.post(url, files=files)

print(response.text)

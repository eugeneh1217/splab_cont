from Levenshtein import distance
from model import pipe
import json
import parse_xml


def extract_values(obj):
    """Recursively extracts all values from a JSON-like object."""
    if isinstance(obj, dict):
        return [value for v in obj.values() for value in extract_values(v)]
    elif isinstance(obj, list):
        return [value for item in obj for value in extract_values(item)]
    else:
        return [obj]


with open('test_images/labels.json') as label_file:
    labels = json.loads(label_file.read())


results = 'file_name,score\n'


for label in labels:
    file_name = label['file_name']
    expected = label['expected']

    xml_receipt_extraction =  pipe(images=file_name)[0]['generated_text']
    dict_receipt_extraction = parse_xml.receipt_xml_to_dict(xml_receipt_extraction)

    output_json_str = extract_values(dict_receipt_extraction)
    expected_json_str = extract_values(expected)

    dist = distance(output_json_str, expected_json_str)

    total = len(expected_json_str) + len(expected_json_str)

    score = (total - dist) / total

    results += f'{file_name},{score}\n'

    print(results)



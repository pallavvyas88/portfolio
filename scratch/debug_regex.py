import json
import re

transcript_path = r"C:\Users\LINK-LAP-31\.gemini\antigravity\brain\af16cf15-ab70-49c8-b665-33d75ab25913\.system_generated\logs\transcript_full.jsonl"

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            content = data.get("content", "")
            text = str(content)
            if "i want to update svg i have svg as well" in text:
                print("Length of text:", len(text))
                print("Ends with </svg>?", text.strip().endswith("</svg>"))
                match = re.search(r'(<svg.*?</svg>)', text, re.IGNORECASE | re.DOTALL)
                if match:
                    print("Regex match found! length:", len(match.group(1)))
                else:
                    print("Regex match FAILED.")
                    # print last 100 chars
                    print("Last 100 chars:", text[-100:])
                break
        except Exception as e:
            pass

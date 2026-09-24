import json

transcript_path = r"C:\Users\LINK-LAP-31\.gemini\antigravity\brain\af16cf15-ab70-49c8-b665-33d75ab25913\.system_generated\logs\transcript_full.jsonl"

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("source") == "USER_EXPLICIT" and data.get("type") == "USER_INPUT":
                content = data.get("content", "")
                text = str(content)
                if "i want to update svg i have svg as well" in text:
                    print("Found user input length:", len(text))
                    print("Last 200 chars:")
                    print(text[-200:])
        except Exception as e:
            pass

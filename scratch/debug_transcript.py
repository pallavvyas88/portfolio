import json

transcript_path = r"C:\Users\LINK-LAP-31\.gemini\antigravity\brain\af16cf15-ab70-49c8-b665-33d75ab25913\.system_generated\logs\transcript_full.jsonl"

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            content = data.get("content", "")
            if isinstance(content, list):
                text_parts = [part.get("text", "") for part in content if part.get("type") == "text"]
                text = "".join(text_parts)
            elif isinstance(content, str):
                text = content
            else:
                text = str(content)
                
            if "i want to update svg" in text:
                print("FOUND IT!")
                print(type(content))
                if isinstance(content, str):
                    print("First 100 chars:", content[:100])
                break
        except Exception as e:
            pass

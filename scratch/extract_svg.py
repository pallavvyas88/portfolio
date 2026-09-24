import json
import re

transcript_path = r"C:\Users\LINK-LAP-31\.gemini\antigravity\brain\af16cf15-ab70-49c8-b665-33d75ab25913\.system_generated\logs\transcript_full.jsonl"
out_path = r"d:\Projects\Learning\Portfolio with tools\src\components\doodles\MainIllustration.tsx"

svg_content = None

with open(transcript_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for line in reversed(lines):
        try:
            data = json.loads(line)
            content = data.get("content", "")
            if isinstance(content, list):
                text_parts = [part.get("text", "") for part in content if part.get("type") == "text"]
                text = "".join(text_parts)
            else:
                text = str(content)
                
            if "i want to update svg" in text and "<svg" in text:
                match = re.search(r'(<svg.*?</svg>)', text, re.DOTALL)
                if match:
                    svg_content = match.group(1)
                    break
        except Exception as e:
            pass

if svg_content:
    svg_content = re.sub(r'fill-rule', 'fillRule', svg_content)
    svg_content = re.sub(r'clip-rule', 'clipRule', svg_content)
    svg_content = re.sub(r'stroke-width', 'strokeWidth', svg_content)
    svg_content = re.sub(r'stroke-linecap', 'strokeLinecap', svg_content)
    svg_content = re.sub(r'stroke-linejoin', 'strokeLinejoin', svg_content)
    svg_content = re.sub(r'stroke-miterlimit', 'strokeMiterlimit', svg_content)
    svg_content = re.sub(r'stroke-dasharray', 'strokeDasharray', svg_content)
    svg_content = re.sub(r'stroke-dashoffset', 'strokeDashoffset', svg_content)
    svg_content = re.sub(r'stop-color', 'stopColor', svg_content)
    svg_content = re.sub(r'stop-opacity', 'stopOpacity', svg_content)
    svg_content = re.sub(r'class=', 'className=', svg_content)
    svg_content = re.sub(r'xmlns:xlink', 'xmlnsXlink', svg_content)
    svg_content = re.sub(r'xml:space', 'xmlSpace', svg_content)
    
    component_code = f"""import React from 'react';

export default function MainIllustration(props: React.SVGProps<SVGSVGElement>) {{
  return (
    <div className="w-full flex justify-center items-center my-8 max-w-[1440px] mx-auto">
      {svg_content.replace('<svg ', '<svg {...props} className={{props.className || "w-full h-auto"}} ')}
    </div>
  );
}}
"""
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(component_code)
    print("Successfully wrote SVG to", out_path)
else:
    print("Could not find SVG in the transcript.")

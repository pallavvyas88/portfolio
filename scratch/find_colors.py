import re

with open(r"C:\Users\LINK-LAP-31\Downloads\Logo System.svg", "r", encoding="utf-8") as f:
    content = f.read()

# Find all hex colors and named colors inside fill="", stroke="", stop-color=""
colors = set()
matches = re.findall(r'(?:fill|stroke|stop-color)="([^"]+)"', content, re.IGNORECASE)
for m in matches:
    colors.add(m.lower())

print("Unique colors found:")
for c in sorted(colors):
    print(c)

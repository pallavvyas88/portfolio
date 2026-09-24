import re

in_path = r"C:\Users\LINK-LAP-31\Downloads\Preview Surface.svg"
out_path = r"d:\Projects\Learning\Portfolio with tools\src\app\icon.svg"

with open(in_path, "r", encoding="utf-8") as f:
    svg = f.read()

# Remove rects
svg = re.sub(r'<rect[^>]*/>', '', svg)

# Let's replace specific colors
# "#1E1E1E" -> "#FF5A36" (coral)
# "#7A7A7A" -> "#FF5A36"
# "#6E6E6E" -> "#FF5A36"
# This will make the entire logo coral.

svg = re.sub(r'(?i)"#1e1e1e"', '"#FF5A36"', svg)
svg = re.sub(r'(?i)"#7a7a7a"', '"#FF5A36"', svg)
svg = re.sub(r'(?i)"#6e6e6e"', '"#FF5A36"', svg)

with open(out_path, "w", encoding="utf-8") as f:
    f.write(svg)

print("Created icon.svg")

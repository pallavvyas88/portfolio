import re

path = r"d:\Projects\Learning\Portfolio with tools\src\app\tools\image-optimizer\ImageOptimizerTool.tsx"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Just put the eslint comment before <img
# but it must be valid JSX.
# It's safer to use eslint-disable at the top of the file.

content = "/* eslint-disable @next/next/no-img-element */\n" + content

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

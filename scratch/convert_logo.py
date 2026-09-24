import re

in_path = r"C:\Users\LINK-LAP-31\Downloads\Preview Surface.svg"
out_path = r"d:\Projects\Learning\Portfolio with tools\src\components\doodles\BrandLogo.tsx"

with open(in_path, "r", encoding="utf-8") as f:
    svg_content = f.read()

# Color replacements
replacements = {
    r'(?i)"#f7f3e9"': '"var(--bg-canvas)"',
    r'(?i)"#1e1e1e"': '"var(--ink)"',
    r'(?i)"white"': '"var(--paper)"',
    r'(?i)"#d8d0c0"': '"var(--border-hand)"',
    r'(?i)"#5f5f5f"': '"var(--ink-muted)"',
    r'(?i)"#6e6e6e"': '"var(--ink-muted)"',
    r'(?i)"#7a7a7a"': '"var(--ink-muted)"',
}

for pattern, replacement in replacements.items():
    svg_content = re.sub(pattern, replacement, svg_content)

# Attribute conversions
attrs = {
    r'fill-rule': 'fillRule',
    r'clip-rule': 'clipRule',
    r'stroke-width': 'strokeWidth',
    r'stroke-linecap': 'strokeLinecap',
    r'stroke-linejoin': 'strokeLinejoin',
    r'stroke-miterlimit': 'strokeMiterlimit',
    r'stroke-dasharray': 'strokeDasharray',
    r'stroke-dashoffset': 'strokeDashoffset',
    r'stop-color': 'stopColor',
    r'stop-opacity': 'stopOpacity',
    r'xml:space': 'xmlSpace',
    r'class=': 'className=',
    r'xmlns:xlink=': 'xmlnsXlink=',
}

for old, new in attrs.items():
    svg_content = svg_content.replace(old, new)

# Wrap in a React component
svg_content = svg_content.replace('<svg ', '<svg {...props} className={props.className || "w-full h-auto"} ')

component_code = f"""import React from 'react';

export default function BrandLogo(props: React.SVGProps<SVGSVGElement>) {{
  return (
    {svg_content}
  );
}}
"""

with open(out_path, "w", encoding="utf-8") as f:
    f.write(component_code)

print("Created BrandLogo.tsx!")

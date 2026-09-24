import re
import os

fixes = {
    r"src\components\os\BootSequence.tsx": ["AnimatePresence", "Search", "X", "Terminal", "Server", "Package", "ArrowRight", "handleComplete"],
    r"src\components\os\Dock.tsx": ["motion"],
    r"src\components\os\Window.tsx": ["useRef", "useEffect"],
    r"src\components\os\apps\LogiwaApp.tsx": ["Truck", "AlertTriangle", "Clock", "setIsConnected"],
    r"src\components\os\apps\NeuralEngineApp.tsx": ["Download", "AlertCircle"],
    r"src\components\os\apps\SystemApp.tsx": ["Code2", "Github", "ExternalLink"],
    r"src\store\osStore.ts": ["get"],
}

base = r"d:\Projects\Learning\Portfolio with tools"

for file, items in fixes.items():
    path = os.path.join(base, file)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    for item in items:
        # replace item followed by comma
        content = re.sub(r'\b' + item + r'\b\s*,?', '', content)
        # cleanup empty import brackets like import { } from
        content = re.sub(r'import\s*\{\s*\}\s*from\s*[\'"][^\'"]+[\'"];?\n?', '', content)
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

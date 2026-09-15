import json
import re

transcript_path = "/Users/glynne/.gemini/antigravity-ide/brain/e4c7ceb1-3049-406c-b542-f78294c4bcc4/.system_generated/logs/transcript_full.jsonl"
lines_dict = {}

with open(transcript_path, 'r') as f:
    for line_json in f:
        try:
            data = json.loads(line_json)
            if data.get("type") == "VIEW_FILE":
                content = data.get("content", "")
                if "page.tsx" in content:
                    # lines look like:
                    # 1: 'use client';
                    # 2: 
                    # 3: import ...
                    for line in content.split("\n"):
                        match = re.match(r"^(\d+):\s(.*)$", line)
                        if match:
                            line_num = int(match.group(1))
                            line_content = match.group(2)
                            lines_dict[line_num] = line_content
        except Exception as e:
            pass

# Now reconstruct
if not lines_dict:
    print("No lines found!")
    exit(1)

max_line = max(lines_dict.keys())
missing_lines = []
with open("reconstructed_page.tsx", "w") as f:
    for i in range(1, max_line + 1):
        if i in lines_dict:
            f.write(lines_dict[i] + "\n")
        else:
            missing_lines.append(i)
            f.write(f"// MISSING LINE {i}\n")

if missing_lines:
    print(f"Reconstructed with missing lines: {missing_lines}")
else:
    print("Perfectly reconstructed!")

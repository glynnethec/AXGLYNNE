import json
import re

lines_dict = {}

def parse_transcript(path):
    with open(path, 'r') as f:
        for line_json in f:
            try:
                data = json.loads(line_json)
                if data.get("type") == "VIEW_FILE":
                    content = data.get("content", "")
                    path_match = re.search(r"File Path: `([^`]+)`", content)
                    if path_match and path_match.group(1) == "file:///Users/glynne/Desktop/GLYNNE_SITE_2026/src/app/page.tsx":
                        for line in content.split("\n"):
                            match = re.match(r"^(\d+):\s(.*)$", line)
                            if match:
                                line_num = int(match.group(1))
                                line_content = match.group(2)
                                if line_num not in lines_dict:
                                    lines_dict[line_num] = line_content
            except:
                pass

# Parse current FIRST, so we get the earliest views from this session (before corruption)
parse_transcript("/Users/glynne/.gemini/antigravity-ide/brain/e4c7ceb1-3049-406c-b542-f78294c4bcc4/.system_generated/logs/transcript_full.jsonl")
# Then parse previous to fill any gaps (lines 161-239)
parse_transcript("/Users/glynne/.gemini/antigravity-ide/brain/f7dd43ea-178b-4c8f-9c69-00a1c8f2d7a1/.system_generated/logs/transcript_full.jsonl")

max_line = max(lines_dict.keys())
with open("reconstructed_clean.tsx", "w") as f:
    for i in range(1, max_line + 1):
        if i in lines_dict:
            f.write(lines_dict[i] + "\n")
        else:
            f.write(f"// MISSING LINE {i}\n")

print("Done clean parse")

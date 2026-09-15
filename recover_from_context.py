import json

transcript_path = "/Users/glynne/.gemini/antigravity-ide/brain/e4c7ceb1-3049-406c-b542-f78294c4bcc4/.system_generated/logs/transcript_full.jsonl"
found_content = ""

with open(transcript_path, 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("type") == "USER_INPUT":
                # User inputs usually contain context attachments
                content = data.get("content", "")
                if "export default function Home()" in content and "Vanta Background State" in content:
                    # extract the file content from the markdown blocks
                    import re
                    match = re.search(r'```tsx\s+(.*?)\s+```', content, re.DOTALL)
                    if match:
                        found_content = match.group(1)
                        break
        except Exception as e:
            print("Error parsing line", e)
            pass

if found_content:
    with open("recovered_from_context.tsx", "w") as f:
        f.write(found_content)
    print("Found in context! Length:", len(found_content))
else:
    print("Not found in context markdown blocks")

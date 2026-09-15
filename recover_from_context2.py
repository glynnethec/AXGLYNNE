import json

transcript_path = "/Users/glynne/.gemini/antigravity-ide/brain/e4c7ceb1-3049-406c-b542-f78294c4bcc4/.system_generated/logs/transcript_full.jsonl"
found_content = ""

with open(transcript_path, 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("type") == "USER_INPUT":
                content = data.get("content", "")
                if "Vanta Fog Container" in content or "export default function Home()" in content:
                    # just save the whole content to see what it looks like
                    found_content += "\n\n--- NEW MESSAGE ---\n\n" + content
        except Exception as e:
            pass

with open("user_inputs.txt", "w") as f:
    f.write(found_content)

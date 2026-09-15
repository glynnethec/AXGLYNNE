import os
import json

transcript_path = "/Users/glynne/.gemini/antigravity-ide/brain/f7dd43ea-178b-4c8f-9c69-00a1c8f2d7a1/.system_generated/logs/transcript_full.jsonl"
last_page_content = None

with open(transcript_path, 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if "tool_calls" in data:
                for tc in data["tool_calls"]:
                    if tc["name"] in ["write_to_file", "replace_file_content", "multi_replace_file_content"]:
                        args = tc.get("args", {})
                        if "page.tsx" in str(args.get("TargetFile", "")):
                            if tc["name"] == "write_to_file" and "CodeContent" in args:
                                last_page_content = args["CodeContent"]
                            # if it's a replace, we would need to apply it, which is complex.
                            # But wait, there might be a final view_file? Or we can just get the last write_to_file.
        except:
            pass

if last_page_content:
    with open("recovered_page.tsx", "w") as f:
        f.write(last_page_content)
    print("Recovered write_to_file to recovered_page.tsx")
else:
    print("Not found")

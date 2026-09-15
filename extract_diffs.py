import json

transcript_path = "/Users/glynne/.gemini/antigravity-ide/brain/f7dd43ea-178b-4c8f-9c69-00a1c8f2d7a1/.system_generated/logs/transcript_full.jsonl"
diffs = []

with open(transcript_path, 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("type") == "CODE_ACTION" and data.get("source") == "USER_EXPLICIT":
                content = data.get("content", "")
                if "page.tsx" in content and "[diff_block_start]" in content:
                    diff_start = content.find("[diff_block_start]") + len("[diff_block_start]\n")
                    diff_end = content.find("[diff_block_end]")
                    diff_content = content[diff_start:diff_end]
                    diffs.append(diff_content)
        except:
            pass

with open("all_diffs.patch", "w") as f:
    for diff in diffs:
        f.write("--- a/recovered_page.tsx\n")
        f.write("+++ b/recovered_page.tsx\n")
        f.write(diff)
        f.write("\n")

print(f"Extracted {len(diffs)} diff blocks.")

import sys

with open('src/app/page.tsx', 'r') as f:
    content = f.read()

# 1. Remove overflow: 'hidden' from the wrapper
content = content.replace("backgroundColor: '#ffffff', overflow: 'hidden'", "backgroundColor: '#ffffff'")

# 2. Extract hero-container
hero_start = content.find('      <div ref={containerRef} className="hero-container">')
if hero_start == -1:
    print("Could not find hero-container")
    sys.exit(1)

# Find the end of the hero container. It ends right before </main>
hero_end = content.find('    </main>')
if hero_end == -1:
    print("Could not find end of main")
    sys.exit(1)

hero_chunk = content[hero_start:hero_end]

# Remove hero chunk from original
content = content[:hero_start] + content[hero_end:]

# 3. Find where SECTION 3 starts to insert hero_chunk BEFORE it
sec3_start = content.find('        {/* SECTION 3: VIDEO SIMPLE */}')
if sec3_start == -1:
    print("Could not find SECTION 3")
    sys.exit(1)

content = content[:sec3_start] + hero_chunk + '\n' + content[sec3_start:]

with open('src/app/page.tsx', 'w') as f:
    f.write(content)

print("Moved GSAP section successfully")

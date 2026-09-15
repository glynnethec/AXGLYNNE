const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let found = false;
walkDir('.next', function(filePath) {
    if (filePath.endsWith('.map')) {
        try {
            const map = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (map.sources) {
                const idx = map.sources.findIndex(s => s.includes('src/app/page.tsx') || s.includes('src/app/page.tsx?'));
                if (idx !== -1 && map.sourcesContent && map.sourcesContent[idx]) {
                    const content = map.sourcesContent[idx];
                    // Verify it's actually our page content and not a placeholder
                    if (content.includes('export default function Home') && content.includes('use client')) {
                        fs.writeFileSync('turbopack_restored.tsx', content);
                        console.log("Restored from " + filePath);
                        found = true;
                        process.exit(0);
                    }
                }
            }
        } catch (e) {
            // ignore JSON parse errors
        }
    }
});

if (!found) console.log("Not found.");

const fs = require('fs');
const path = require('path');

const mapPath = path.join('.next', 'server', 'app', 'page.js.map');
if (!fs.existsSync(mapPath)) {
    console.log("No source map found at " + mapPath);
    process.exit(1);
}

const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const idx = map.sources.findIndex(s => s.includes('page.tsx'));
if (idx === -1) {
    console.log("page.tsx not found in source map");
    process.exit(1);
}

fs.writeFileSync('restored_from_sourcemap.tsx', map.sourcesContent[idx]);
console.log("Successfully extracted restored_from_sourcemap.tsx!");

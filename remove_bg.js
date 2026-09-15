const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

async function main() {
    try {
        const inputPath = 'public/GSAPimg/robot2.png';
        console.log(`Processing ${inputPath}...`);
        
        const blob = await removeBackground(inputPath);
        const buffer = Buffer.from(await blob.arrayBuffer());
        
        const outputPath = 'public/GSAPimg/robot2_transparent.png';
        fs.writeFileSync(outputPath, buffer);
        console.log(`Saved transparent image to ${outputPath}`);
    } catch (e) {
        console.error("Error removing background:", e);
    }
}
main();

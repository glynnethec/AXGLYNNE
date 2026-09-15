const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

const inputDir = '/Users/glynne/Desktop/GLYNNE_SITE_2026/public/GSAPimg/robot2_frames';
const outputDir = '/Users/glynne/Desktop/GLYNNE_SITE_2026/public/GSAPimg/robot2_frames_ai';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function processFrames() {
    console.log("Starting AI Background Removal for 240 frames...");
    const startTime = Date.now();
    for (let i = 1; i <= 240; i++) {
        const frameName = `frame_${String(i).padStart(4, '0')}.png`;
        const inputPath = path.join(inputDir, frameName);
        const outputPath = path.join(outputDir, frameName);
        
        try {
            console.log(`Processing ${frameName} (${i}/240)...`);
            const blob = await removeBackground(inputPath);
            const buffer = Buffer.from(await blob.arrayBuffer());
            fs.writeFileSync(outputPath, buffer);
        } catch (e) {
            console.error(`Error processing ${frameName}:`, e);
        }
    }
    const endTime = Date.now();
    console.log(`Finished processing 240 frames in ${((endTime - startTime) / 1000).toFixed(2)} seconds.`);
}

processFrames();

const fs = require('fs');
const path = require('path');

const dir = 'src/app/Segurity/components';
const files = fs.readdirSync(dir);

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!filePath.endsWith('.tsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace titles
  content = content.replace(/clamp\(32px, 5vw, 64px\)/g, "clamp(28px, 4vw, 40px)");
  content = content.replace(/clamp\(32px, 5vw, 56px\)/g, "clamp(28px, 4vw, 40px)");
  content = content.replace(/clamp\(28px, 4vw, 48px\)/g, "clamp(28px, 4vw, 40px)");
  content = content.replace(/clamp\(40px, 6vw, 80px\)/g, "clamp(28px, 4vw, 40px)");
  
  // Replace subtitles/texts
  content = content.replace(/clamp\(16px, 2vw, 20px\)/g, "clamp(14px, 1.5vw, 16px)");
  content = content.replace(/clamp\(15px, 1.5vw, 18px\)/g, "clamp(14px, 1.5vw, 16px)");
  content = content.replace(/clamp\(18px, 2\.5vw, 24px\)/g, "clamp(16px, 2vw, 20px)");
  content = content.replace(/clamp\(24px, 4vw, 48px\)/g, "clamp(20px, 3vw, 28px)");

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Font sizes fixed.");

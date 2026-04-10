const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

walk('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Fix fonts sizes which were missing from config
    content = content.replace(/text-display-2xl/g, 'text-5xl md:text-7xl');
    content = content.replace(/text-display-xl/g, 'text-4xl md:text-6xl');
    content = content.replace(/text-display-lg/g, 'text-3xl md:text-5xl');
    content = content.replace(/text-display-md/g, 'text-2xl md:text-4xl');
    content = content.replace(/text-display-sm/g, 'text-xl md:text-3xl');

    // Structural Backgrounds
    content = content.replace(/bg-obsidian-900\/98/g, 'bg-ivory-DEFAULT/98');
    content = content.replace(/bg-obsidian-900\/95/g, 'bg-ivory-DEFAULT/95');
    content = content.replace(/bg-obsidian-900\/90/g, 'bg-ivory-DEFAULT/90');
    // Hover overlays need to stay dark or get lighter
    content = content.replace(/bg-obsidian-900\/70/g, 'bg-ivory-DEFAULT/90'); 
    content = content.replace(/bg-obsidian-900\/60/g, 'bg-ivory-DEFAULT/90');
    
    // Core Backgrounds
    content = content.replace(/bg-obsidian-900/g, 'bg-ivory-DEFAULT');
    content = content.replace(/bg-obsidian-800/g, 'bg-white');
    content = content.replace(/bg-obsidian-700/g, 'bg-ivory-warm');
    content = content.replace(/bg-\[rgba\(10,10,10,0\.8\)\]/g, 'bg-white/90');
    content = content.replace(/bg-\[rgba\(10,10,10,0\.85\)\]/g, 'bg-white/90');
    content = content.replace(/bg-\[rgba\(10,10,10,0\.7\)\]/g, 'bg-white/90');

    // Text Colors
    content = content.replace(/text-ivory-DEFAULT/g, 'text-obsidian-900');
    content = content.replace(/text-obsidian-900/g, 'text-obsidian-900'); // No-op if it was there
    
    // Transparent text/bordes mappings
    // 250,247,240 is Ivory
    content = content.replace(/rgba\(250,247,240,0\.55\)/g, 'rgba(10,10,10,0.65)');
    content = content.replace(/rgba\(250,247,240,0\.5\)/g, 'rgba(10,10,10,0.6)');
    content = content.replace(/rgba\(250,247,240,0\.45\)/g, 'rgba(10,10,10,0.55)');
    content = content.replace(/rgba\(250,247,240,0\.4\)/g, 'rgba(10,10,10,0.5)');
    content = content.replace(/rgba\(250,247,240,0\.38\)/g, 'rgba(10,10,10,0.5)');
    content = content.replace(/rgba\(250,247,240,0\.35\)/g, 'rgba(10,10,10,0.45)');
    content = content.replace(/rgba\(250,247,240,0\.32\)/g, 'rgba(10,10,10,0.4)');
    content = content.replace(/rgba\(250,247,240,0\.3\)/g, 'rgba(10,10,10,0.4)');
    content = content.replace(/rgba\(250,247,240,0\.25\)/g, 'rgba(10,10,10,0.35)');
    content = content.replace(/rgba\(250,247,240,0\.65\)/g, 'rgba(10,10,10,0.75)');
    content = content.replace(/rgba\(250,247,240,0\.7\)/g, 'rgba(10,10,10,0.8)');
    content = content.replace(/rgba\(250,247,240,0\.75\)/g, 'rgba(10,10,10,0.85)');
    content = content.replace(/rgba\(250,247,240,0\.48\)/g, 'rgba(10,10,10,0.55)');
    content = content.replace(/rgba\(250,247,240,0\.6\)/g, 'rgba(10,10,10,0.7)');
    content = content.replace(/rgba\(250,247,240,0\.42\)/g, 'rgba(10,10,10,0.5)');
    content = content.replace(/rgba\(250,247,240,0\.58\)/g, 'rgba(10,10,10,0.65)');

    // 255,255,255 is White (usually borders)
    content = content.replace(/rgba\(255,255,255,0\.07\)/g, 'rgba(0,0,0,0.08)');
    content = content.replace(/rgba\(255,255,255,0\.05\)/g, 'rgba(0,0,0,0.08)');
    content = content.replace(/rgba\(255,255,255,0\.06\)/g, 'rgba(0,0,0,0.08)');
    content = content.replace(/rgba\(255,255,255,0\.08\)/g, 'rgba(0,0,0,0.1)');
    content = content.replace(/rgba\(255,255,255,0\.15\)/g, 'rgba(0,0,0,0.15)');
    content = content.replace(/rgba\(255,255,255,0\.2\)/g, 'rgba(0,0,0,0.2)');
    content = content.replace(/rgba\(255,255,255,0\.18\)/g, 'rgba(0,0,0,0.18)');
    content = content.replace(/rgba\(255,255,255,0\.04\)/g, 'rgba(0,0,0,0.04)');

    // Component changes
    content = content.replace(/card-dark-hover/g, 'card-light-hover');
    content = content.replace(/card-dark/g, 'card-light');
    content = content.replace(/shadow-card-dark/g, 'shadow-card-light');
    
    // Change radial gradients
    content = content.replace(/to bottom, transparent, #0A0A0A/g, 'to bottom, transparent, #FAF7F0');
    content = content.replace(/rgba\(18,18,16,1\)/g, 'rgba(255,255,255,1)');
    content = content.replace(/rgba\(28,28,24,1\)/g, 'rgba(255,255,255,1)');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});

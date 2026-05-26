import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';

async function processImages() {
  // Map source images to clean output filenames
  const imageMap = {
    'Messi 10.jpg': 'messi.png',
    'Gabriel Batistuta original images.jpg': 'batistuta.png',
    'Gabriel Batistuta original images (1).jpg': 'batistuta-2.png',
    'Diego forlan \uD83D\uDC80.jpg': 'forlan.png',
    'Son heung min.jpg': 'son.png',
    '724024077569323411.jpg': 'player-1.png',
    '739434832574531636.jpg': 'player-2.png',
    '889672101386150069.jpg': 'player-3.png',
  };

  if (!fs.existsSync('public/players')) {
    fs.mkdirSync('public/players', { recursive: true });
  }

  for (const [img, outName] of Object.entries(imageMap)) {
    if (!fs.existsSync(img)) {
      console.log(`Skipping ${img} (not found)`);
      continue;
    }
    console.log(`Processing ${img} -> ${outName}...`);
    try {
      const blob = await removeBackground(img);
      const buffer = Buffer.from(await blob.arrayBuffer());
      fs.writeFileSync(`public/players/${outName}`, buffer);
      console.log(`Saved public/players/${outName}`);
    } catch (e) {
      console.error(`Failed on ${img}:`, e.message);
    }
  }
}

processImages();

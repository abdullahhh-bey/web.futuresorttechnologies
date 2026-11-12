import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const inputDir = path.resolve('public/projects/team');
const outputDir = path.resolve('public/team');
const inboxDir = path.resolve('public/team/_inbox/processed');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(inboxDir)) {
  fs.mkdirSync(inboxDir, { recursive: true });
}

const members = [
  {
    name: 'Atiq ur Rehman',
    role: 'CEO & Founder',
    sourceFile: 'CEO & Founder.jfif',
    targetFile: 'atiq-ur-rehman.webp',
  },
  {
    name: 'Abdullah Amirr',
    role: 'Co-Founder & Technical Lead Engineer',
    sourceFile: 'Co Founder & Technical Lead Engineer.jfif',
    targetFile: 'abdullah-amirr.webp',
  },
  {
    name: 'Hasnain Ashfaq',
    role: 'CTO',
    sourceFile: 'CTO.png',
    targetFile: 'hasnain-ashfaq.webp',
  },
  {
    name: 'Muhammad Zeeshan',
    role: 'COO',
    sourceFile: 'COO.png',
    targetFile: 'muhammad-zeeshan.webp',
  },
];

async function processImages() {
  for (const m of members) {
    const srcPath = path.join(inputDir, m.sourceFile);
    const destPath = path.join(outputDir, m.targetFile);
    console.log(`Processing ${m.name} from ${srcPath}...`);

    if (!fs.existsSync(srcPath)) {
      console.error(`Missing source: ${srcPath}`);
      continue;
    }

    const metadata = await sharp(srcPath).metadata();
    console.log(`Original dimensions: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);

    // Crop to 4:5 (800x1000) using sharp's attention / smart crop
    await sharp(srcPath)
      .resize(800, 1000, {
        fit: 'cover',
        position: sharp.strategy.attention,
      })
      .webp({ quality: 80, effort: 6 })
      .toFile(destPath);

    const stats = fs.statSync(destPath);
    console.log(`Generated ${destPath} (${Math.round(stats.size / 1024)} KB)`);
  }
}

processImages().catch(err => {
  console.error(err);
  process.exit(1);
});


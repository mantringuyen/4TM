import fs from 'fs';
import path from 'path';

function walkDir(dir: string): string[] {
  let files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walkDir(fullPath));
    } else if (entry.name.startsWith('lesson') && entry.name.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

const cssDir = path.join(process.cwd(), 'src/data/css');
const lessonFiles = walkDir(cssDir);

console.log(`Found ${lessonFiles.length} CSS lesson files to inspect.`);

for (const filePath of lessonFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  // If language is missing in examples, add language: "css"
  if (content.includes('"examples": [') && !content.includes('"language": "css"')) {
    content = content.replace(
      /("examples":\s*\[\s*\{\s*"title":\s*\{)/g,
      `"examples": [\n      {\n        "language": "css",\n        "title": {`
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

console.log('Finished adding language to CodeExample.');

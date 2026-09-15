import fs from 'fs';
import path from 'path';

const baseDir = path.join(process.cwd(), 'src/data/javascript');

function getLessonFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getLessonFiles(fullPath));
    } else if (file.startsWith('lesson') && file.endsWith('.ts')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getLessonFiles(baseDir);

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export const (lesson\d+): Lesson = ([\s\S]+?);\s*export default/);
  if (!match) continue;

  const varName = match[1];
  const lessonObj = JSON.parse(match[2]);

  // Convert bestPractices to tips if present
  if (lessonObj.learn?.bestPractices) {
    const tips = lessonObj.learn.bestPractices.map((bp: any) => ({
      en: bp.title?.en ? `${bp.title.en}: ${bp.description?.en || ''}` : (bp.en || ''),
      vi: bp.title?.vi ? `${bp.title.vi}: ${bp.description?.vi || ''}` : (bp.vi || '')
    }));
    lessonObj.learn.tips = tips;
    delete lessonObj.learn.bestPractices;
  }

  const updatedCode = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lessonObj, null, 2)};\nexport default ${varName};\n`;
  fs.writeFileSync(filePath, updatedCode, 'utf8');
}

console.log('bestPractices converted to tips across all JS lessons.');

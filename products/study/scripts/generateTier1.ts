import * as fs from 'fs';
import * as path from 'path';
import { tier1Lessons } from './buildTier1Data';

const targetDir = path.resolve(process.cwd(), 'src/data/sql');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targetFile = path.join(targetDir, 'sqlLessonsTier1.ts');
const fileContent = `import { Lesson } from '../../types';

export const sqlLessonsTier1: Lesson[] = ${JSON.stringify(tier1Lessons, null, 2)};
`;

fs.writeFileSync(targetFile, fileContent, 'utf-8');
console.log(`Generated Tier 1 lessons: ${tier1Lessons.length} lessons written to ${targetFile}`);

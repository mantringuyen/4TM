import { sqlLessonsTier1 } from '../src/data/sql/sqlLessonsTier1';
import { sqlLessonsTier2 } from '../src/data/sql/sqlLessonsTier2';
import { sqlLessonsTier3 } from '../src/data/sql/sqlLessonsTier3';
import { sqlLessonsTier4 } from '../src/data/sql/sqlLessonsTier4';
import { Lesson } from '../src/types';
import * as fs from 'fs';
import * as path from 'path';

const allLessons: Lesson[] = [
  ...sqlLessonsTier1,
  ...sqlLessonsTier2,
  ...sqlLessonsTier3,
  ...sqlLessonsTier4
];

const metadataList = allLessons.map(l => ({
  id: l.id,
  moduleId: l.moduleId,
  levelId: l.levelId,
  courseId: l.courseId,
  order: l.order,
  topicId: l.topicId,
  title: l.title,
  summary: l.summary,
  estimatedMinutes: l.estimatedMinutes,
  learn: null as any,
  exercisePool: [],
  challenge: null as any,
  quizQuestionPool: []
}));

const outputPath = path.join(process.cwd(), 'src', 'data', 'sql', 'sqlLessonMetadata.ts');
const fileContent = `import { Lesson } from '../../types';\n\n// Lightweight SQL lesson headers for fast course indexing without heavy content\nexport const sqlLessonMetadataList: Lesson[] = ${JSON.stringify(metadataList, null, 2)};\n`;

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully generated SQL lesson metadata: ${metadataList.length} items written to ${outputPath}`);

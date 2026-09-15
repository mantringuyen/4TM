import fs from 'fs';
import path from 'path';
import { Lesson, QuizQuestion, ExerciseItem } from '../src/types';

import { basicLessons } from '../src/data/python/basicLessons';
import { pythonIntermediateLessonsPart1 } from '../src/data/python/intermediateLessonsPart1';
import { pythonIntermediateLessonsPart2 } from '../src/data/python/intermediateLessonsPart2';
import { pythonAdvancedLessonsPart1 } from '../src/data/python/advancedLessonsPart1';
import { pythonAdvancedLessonsPart2 } from '../src/data/python/advancedLessonsPart2';
import { pythonAdvancedLessonsPart3 } from '../src/data/python/advancedLessonsPart3';

// Helper to assemble clean TypeScript file content
export function formatLessonArrayToFile(variableName: string, lessons: Lesson[]): string {
  const content = `import { Lesson } from '../../types';\n\nexport const ${variableName}: Lesson[] = ${JSON.stringify(lessons, null, 2)};\n`;
  return content;
}

console.log("Helper loaded.");

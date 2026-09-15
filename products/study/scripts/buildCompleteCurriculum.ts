import fs from 'fs';
import path from 'path';
import { Lesson, QuizQuestion, ExerciseItem } from '../src/types';

import { basicLessons } from '../src/data/python/basicLessons';
import { pythonIntermediateLessonsPart1 } from '../src/data/python/intermediateLessonsPart1';
import { pythonIntermediateLessonsPart2 } from '../src/data/python/intermediateLessonsPart2';
import { pythonAdvancedLessonsPart1 } from '../src/data/python/advancedLessonsPart1';
import { pythonAdvancedLessonsPart2 } from '../src/data/python/advancedLessonsPart2';
import { pythonAdvancedLessonsPart3 } from '../src/data/python/advancedLessonsPart3';

// Load all 56 lessons
const allLessons: Lesson[] = [
  ...basicLessons,
  ...pythonIntermediateLessonsPart1,
  ...pythonIntermediateLessonsPart2,
  ...pythonAdvancedLessonsPart1,
  ...pythonAdvancedLessonsPart2,
  ...pythonAdvancedLessonsPart3
];

console.log(`Loaded ${allLessons.length} lessons. Preparing full pool enrichment.`);

// Custom serializer that accurately preserves Regexes and clean formatting
function serializeLessonArray(arrayName: string, lessons: Lesson[]): string {
  function serializeVal(val: any, depth = 0): string {
    const spaces = " ".repeat(depth * 2);
    const nextSpaces = " ".repeat((depth + 1) * 2);
    if (val === null) return "null";
    if (val === undefined) return "undefined";
    if (typeof val === "string") return JSON.stringify(val);
    if (typeof val === "number" || typeof val === "boolean") return String(val);
    if (val instanceof RegExp) return val.toString();
    if (Array.isArray(val)) {
      if (val.length === 0) return "[]";
      if (val.every(x => typeof x === "number" || typeof x === "string")) {
        return "[" + val.map(x => JSON.stringify(x)).join(", ") + "]";
      }
      const items = val.map(item => nextSpaces + serializeVal(item, depth + 1)).join(",\n");
      return "[\n" + items + "\n" + spaces + "]";
    }
    if (typeof val === "object") {
      const keys = Object.keys(val);
      if (keys.length === 0) return "{}";
      const entries = keys.map(k => {
        const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
        return `${nextSpaces}${formattedKey}: ${serializeVal(val[k], depth + 1)}`;
      }).join(",\n");
      return "{\n" + entries + "\n" + spaces + "}";
    }
    return String(val);
  }

  return `import { Lesson } from '../../types';\n\nexport const ${arrayName}: Lesson[] = ${serializeVal(lessons, 0)};\n`;
}

// 56 Topics Domain Knowledge Matrix
import { getDomainPoolForLesson } from './domainPools';
import { applyPedagogicalFixes } from './pedagogicalFixes';

// Process each lesson
allLessons.forEach((lesson, index) => {
  const lessonNum = index + 1;
  const pool = getDomainPoolForLesson(lessonNum, lesson.topicId || `py_topic_${lessonNum}`, lesson.title.en, lesson.title.vi);
  
  // Update quizQuestionPool (ensuring 16+ unique questions)
  lesson.quizQuestionPool = pool.questions;

  // Update exercisePool (ensuring 5+ unique exercises)
  lesson.exercisePool = pool.exercises;
});

// Apply the 10 pedagogical fixes to learn content
applyPedagogicalFixes(allLessons);

// Split back into original 6 files
const updatedBasic = allLessons.slice(0, 24);
const updatedInter1 = allLessons.slice(24, 33);
const updatedInter2 = allLessons.slice(33, 42);
const updatedAdv1 = allLessons.slice(42, 47);
const updatedAdv2 = allLessons.slice(47, 52);
const updatedAdv3 = allLessons.slice(52, 56);

// Write files
fs.writeFileSync('src/data/python/basicLessons.ts', serializeLessonArray('basicLessons', updatedBasic), 'utf8');
fs.writeFileSync('src/data/python/intermediateLessonsPart1.ts', serializeLessonArray('pythonIntermediateLessonsPart1', updatedInter1), 'utf8');
fs.writeFileSync('src/data/python/intermediateLessonsPart2.ts', serializeLessonArray('pythonIntermediateLessonsPart2', updatedInter2), 'utf8');
fs.writeFileSync('src/data/python/advancedLessonsPart1.ts', serializeLessonArray('pythonAdvancedLessonsPart1', updatedAdv1), 'utf8');
fs.writeFileSync('src/data/python/advancedLessonsPart2.ts', serializeLessonArray('pythonAdvancedLessonsPart2', updatedAdv2), 'utf8');
fs.writeFileSync('src/data/python/advancedLessonsPart3.ts', serializeLessonArray('pythonAdvancedLessonsPart3', updatedAdv3), 'utf8');

console.log("Successfully wrote all 6 Python lesson files with enriched pools!");

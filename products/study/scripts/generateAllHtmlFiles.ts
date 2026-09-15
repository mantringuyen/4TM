import * as fs from 'fs';
import * as path from 'path';

// Let's write the complete, comprehensive HTML curriculum generator script that outputs:
// 1. /src/data/html/htmlLessonMetadata.ts (all 20 lightweight lesson headers for course syllabus indexing)
// 2. /src/data/html/htmlBasicLessonsPart1.ts (Lessons 1-4)
// 3. /src/data/html/htmlBasicLessonsPart2.ts (Lessons 5-8)
// 4. /src/data/html/htmlIntermediateLessonsPart1.ts (Lessons 9-11)
// 5. /src/data/html/htmlIntermediateLessonsPart2.ts (Lessons 12-14)
// 6. /src/data/html/htmlAdvancedLessonsPart1.ts (Lessons 15-17)
// 7. /src/data/html/htmlAdvancedLessonsPart2.ts (Lessons 18-20)
//
// Each lesson has:
// - Comprehensive bilingual Learn section with Introduction, ConceptExplanation, Syntax, 2 rich Examples, 2 Common Mistakes, Tips, Practice Task with starter/solution/requiredPatterns/hint
// - 5 interactive exercises with types (complete_code, fix_code, write_code, modify_example, predict_output), bilingual instructions, starter, solution, hint, explanation
// - 1 Primary Challenge + 2 Variants with requirements, starter, solution, hints, solutionExplanation
// - 16 Quiz Questions with 4 options each, correct answer index, bilingual explanation, topicId, difficulty

import { lesson1 } from './lessons/l1';
import { lesson2 } from './lessons/l2';
import { lesson3 } from './lessons/l3';
import { lesson4 } from './lessons/l4';
import { lesson5 } from './lessons/l5';
import { lesson6 } from './lessons/l6';
import { lesson7 } from './lessons/l7';
import { lesson8 } from './lessons/l8';
import { lesson9 } from './lessons/l9';
import { lesson10 } from './lessons/l10';
import { lesson11 } from './lessons/l11';
import { lesson12 } from './lessons/l12';
import { lesson13 } from './lessons/l13';
import { lesson14 } from './lessons/l14';
import { lesson15 } from './lessons/l15';
import { lesson16 } from './lessons/l16';
import { lesson17 } from './lessons/l17';
import { lesson18 } from './lessons/l18';
import { lesson19 } from './lessons/l19';
import { lesson20 } from './lessons/l20';

const allLessons = [
  lesson1, lesson2, lesson3, lesson4, lesson5,
  lesson6, lesson7, lesson8, lesson9, lesson10,
  lesson11, lesson12, lesson13, lesson14, lesson15,
  lesson16, lesson17, lesson18, lesson19, lesson20
];

console.log(`Total lessons to generate: ${allLessons.length}`);

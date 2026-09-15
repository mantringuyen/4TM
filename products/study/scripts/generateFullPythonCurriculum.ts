import fs from 'fs';
import path from 'path';
import { Lesson, QuizQuestion, ExerciseItem } from '../src/types';

// Let us read the existing lessons to preserve every single lesson's title, summary,
// learn text (intro, concept, syntax, examples, mistakes, tips, practice, consolidation, challenge)
import { basicLessons } from '../src/data/python/basicLessons';
import { pythonIntermediateLessonsPart1 } from '../src/data/python/intermediateLessonsPart1';
import { pythonIntermediateLessonsPart2 } from '../src/data/python/intermediateLessonsPart2';
import { pythonAdvancedLessonsPart1 } from '../src/data/python/advancedLessonsPart1';
import { pythonAdvancedLessonsPart2 } from '../src/data/python/advancedLessonsPart2';
import { pythonAdvancedLessonsPart3 } from '../src/data/python/advancedLessonsPart3';

console.log("Loaded existing Python curriculum files successfully.");

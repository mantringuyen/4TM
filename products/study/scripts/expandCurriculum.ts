import fs from 'fs';
import path from 'path';
import { Lesson, QuizQuestion, ExerciseItem } from '../src/types';

// Let's create a robust script to load existing lessons and expand them
import { basicLessons } from '../src/data/python/basicLessons';
import { pythonIntermediateLessonsPart1 } from '../src/data/python/intermediateLessonsPart1';
import { pythonIntermediateLessonsPart2 } from '../src/data/python/intermediateLessonsPart2';
import { pythonAdvancedLessonsPart1 } from '../src/data/python/advancedLessonsPart1';
import { pythonAdvancedLessonsPart2 } from '../src/data/python/advancedLessonsPart2';
import { pythonAdvancedLessonsPart3 } from '../src/data/python/advancedLessonsPart3';

// Combine all 56 lessons
const all56Lessons: Lesson[] = [
  ...basicLessons,
  ...pythonIntermediateLessonsPart1,
  ...pythonIntermediateLessonsPart2,
  ...pythonAdvancedLessonsPart1,
  ...pythonAdvancedLessonsPart2,
  ...pythonAdvancedLessonsPart3,
];

console.log(`Loaded ${all56Lessons.length} lessons.`);

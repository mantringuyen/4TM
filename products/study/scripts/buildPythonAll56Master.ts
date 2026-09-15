import fs from 'fs';
import path from 'path';
import { Lesson, QuizQuestion, ExerciseItem } from '../src/types';

import { basicLessons } from '../src/data/python/basicLessons';
import { pythonIntermediateLessonsPart1 } from '../src/data/python/intermediateLessonsPart1';
import { pythonIntermediateLessonsPart2 } from '../src/data/python/intermediateLessonsPart2';
import { pythonAdvancedLessonsPart1 } from '../src/data/python/advancedLessonsPart1';
import { pythonAdvancedLessonsPart2 } from '../src/data/python/advancedLessonsPart2';
import { pythonAdvancedLessonsPart3 } from '../src/data/python/advancedLessonsPart3';

// 56 Topic mapping
interface TopicDefinition {
  topicId: string;
  nameEn: string;
  nameVi: string;
  questions: {
    en: string;
    vi: string;
    opts: [string, string][];
    ans: number[];
    expEn: string;
    expVi: string;
    diff?: 'easy' | 'medium' | 'hard';
    type?: 'single_choice' | 'multiple_choice';
  }[];
  exercises: {
    type: 'write_code' | 'fix_code' | 'complete_code' | 'predict_output' | 'problem_solving';
    titleEn: string;
    titleVi: string;
    instEn: string;
    instVi: string;
    starter: string;
    solution: string;
    hintEn: string;
    hintVi: string;
    expEn: string;
    expVi: string;
  }[];
}

console.log("Ready to build master dataset.");

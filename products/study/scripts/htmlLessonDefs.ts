import * as fs from 'fs';
import * as path from 'path';

interface LessonDef {
  order: number;
  id: string;
  moduleId: string;
  levelId: 'basic' | 'intermediate' | 'advanced';
  topicId: string;
  titleEn: string;
  titleVi: string;
  summaryEn: string;
  summaryVi: string;
  introEn: string;
  introVi: string;
  conceptEn: string;
  conceptVi: string;
  syntax: string;
  example1TitleEn: string;
  example1TitleVi: string;
  example1Code: string;
  example1ExpEn: string;
  example1ExpVi: string;
  example2TitleEn: string;
  example2TitleVi: string;
  example2Code: string;
  example2ExpEn: string;
  example2ExpVi: string;
  mistake1En: string;
  mistake1Vi: string;
  correction1En: string;
  correction1Vi: string;
  practiceTaskEn: string;
  practiceTaskVi: string;
  practiceInstEn: string;
  practiceInstVi: string;
  practiceStarter: string;
  practiceSolution: string;
  practiceHintEn: string;
  practiceHintVi: string;
  
  // Exercises
  ex1: { titleEn: string; titleVi: string; instEn: string; instVi: string; starter: string; solution: string; hintEn: string; hintVi: string; expEn: string; expVi: string; };
  ex2: { titleEn: string; titleVi: string; instEn: string; instVi: string; starter: string; solution: string; hintEn: string; hintVi: string; expEn: string; expVi: string; };
  ex3: { titleEn: string; titleVi: string; instEn: string; instVi: string; starter: string; solution: string; hintEn: string; hintVi: string; expEn: string; expVi: string; };
  ex4: { titleEn: string; titleVi: string; instEn: string; instVi: string; starter: string; solution: string; hintEn: string; hintVi: string; expEn: string; expVi: string; };
  ex5: { titleEn: string; titleVi: string; instEn: string; instVi: string; starter: string; solution: string; hintEn: string; hintVi: string; expEn: string; expVi: string; };

  // Challenge
  ch: { titleEn: string; titleVi: string; descEn: string; descVi: string; starter: string; solution: string; expEn: string; expVi: string; };
  chV1: { titleEn: string; titleVi: string; descEn: string; descVi: string; starter: string; solution: string; expEn: string; expVi: string; };
  chV2: { titleEn: string; titleVi: string; descEn: string; descVi: string; starter: string; solution: string; expEn: string; expVi: string; };

  // 16 Quiz Questions
  quizzes: Array<{
    qEn: string;
    qVi: string;
    options: Array<{ en: string; vi: string }>;
    ans: number;
    expEn: string;
    expVi: string;
  }>;
}

// We will write the full generator data in modular files
console.log('Definition interface ready');

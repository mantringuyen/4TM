export interface RawLessonSource {
  order: number;
  id: string;
  moduleId: string;
  levelId: 'basic' | 'intermediate' | 'advanced';
  topicId: string;
  titleEn: string;
  titleVi: string;
  summaryEn: string;
  summaryVi: string;
  estimatedMinutes: number;
  introEn: string;
  introVi: string;
  conceptEn: string;
  conceptVi: string;
  syntax: string;
  ex1TitleEn: string;
  ex1TitleVi: string;
  ex1Code: string;
  ex1ExpEn: string;
  ex1ExpVi: string;
  ex2TitleEn: string;
  ex2TitleVi: string;
  ex2Code: string;
  ex2ExpEn: string;
  ex2ExpVi: string;
  mistake1En: string;
  mistake1Vi: string;
  correction1En: string;
  correction1Vi: string;
  mistake2En: string;
  mistake2Vi: string;
  correction2En: string;
  correction2Vi: string;
  tipEn: string;
  tipVi: string;
  practiceTaskEn: string;
  practiceTaskVi: string;
  practiceInstEn: string;
  practiceInstVi: string;
  practiceStarter: string;
  practiceSolution: string;
  practicePatterns: string[];
  practiceHintEn: string;
  practiceHintVi: string;

  exercises: Array<{
    id: string;
    type: 'complete_code' | 'fix_code' | 'write_code' | 'modify_example' | 'predict_output';
    titleEn: string;
    titleVi: string;
    instEn: string;
    instVi: string;
    starter: string;
    solution: string;
    hintEn?: string;
    hintVi?: string;
    expEn?: string;
    expVi?: string;
  }>;

  challenge: {
    id: string;
    titleEn: string;
    titleVi: string;
    descEn: string;
    descVi: string;
    requirements: Array<{ en: string; vi: string }>;
    starter: string;
    solution: string;
    hints: Array<{ en: string; vi: string }>;
    expEn: string;
    expVi: string;
  };

  challengeVariants: Array<{
    id: string;
    titleEn: string;
    titleVi: string;
    descEn: string;
    descVi: string;
    requirements: Array<{ en: string; vi: string }>;
    starter: string;
    solution: string;
    hints?: Array<{ en: string; vi: string }>;
    expEn: string;
    expVi: string;
  }>;

  quizzes: Array<{
    id: string;
    type: 'single_choice';
    qEn: string;
    qVi: string;
    options: Array<{ en: string; vi: string }>;
    ans: number;
    expEn: string;
    expVi: string;
    difficulty?: 'easy' | 'medium' | 'hard';
  }>;
}

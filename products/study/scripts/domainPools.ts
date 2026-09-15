import { QuizQuestion, ExerciseItem } from '../src/types';

// Helper to construct questions
function q(
  subId: number,
  lessonNum: number,
  topicId: string,
  en: string,
  vi: string,
  opts: [string, string][],
  ans: number[],
  expEn: string,
  expVi: string,
  diff: 'easy' | 'medium' | 'hard' = 'medium',
  type: 'single_choice' | 'multiple_choice' = 'single_choice'
): QuizQuestion {
  return {
    id: `py_q_${lessonNum}_${subId}`,
    type,
    question: { en, vi },
    options: opts.map(([oEn, oVi]) => ({ en: oEn, vi: oVi })),
    correctAnswers: ans,
    explanation: { en: expEn, vi: expVi },
    topicId,
    difficulty: diff
  };
}

// Helper to construct exercises
function ex(
  subId: number,
  lessonNum: number,
  type: 'write_code' | 'fix_code' | 'complete_code' | 'predict_output' | 'problem_solving',
  titleEn: string,
  titleVi: string,
  instEn: string,
  instVi: string,
  starterCode: string,
  solutionCode: string,
  hintEn: string,
  hintVi: string,
  expEn: string,
  expVi: string
): ExerciseItem {
  return {
    id: `py_ex_${lessonNum}_${subId}`,
    type,
    title: { en: titleEn, vi: titleVi },
    instruction: { en: instEn, vi: instVi },
    starterCode,
    solutionCode,
    hint: { en: hintEn, vi: hintVi },
    explanation: { en: expEn, vi: expVi }
  };
}

// Sub-banks for each group
import { getRichGroup1Pool } from './richDomainGroup1';
import { getRichGroup2Pool } from './richDomainGroup2';
import { getRichGroup3Pool } from './richDomainGroup3';
import { getRichGroup4Pool } from './richDomainGroup4';
import { getRichGroup5Pool } from './richDomainGroup5';
import { getRichGroup6Pool } from './richDomainGroup6';

export function getDomainPoolForLesson(lessonNum: number, topicId: string, titleEn: string, titleVi: string): {
  questions: QuizQuestion[];
  exercises: ExerciseItem[];
} {
  if (lessonNum >= 1 && lessonNum <= 10) {
    return getRichGroup1Pool(lessonNum, topicId, titleEn, titleVi, q, ex);
  } else if (lessonNum >= 11 && lessonNum <= 20) {
    return getRichGroup2Pool(lessonNum, topicId, titleEn, titleVi, q, ex);
  } else if (lessonNum >= 21 && lessonNum <= 30) {
    return getRichGroup3Pool(lessonNum, topicId, titleEn, titleVi, q, ex);
  } else if (lessonNum >= 31 && lessonNum <= 40) {
    return getRichGroup4Pool(lessonNum, topicId, titleEn, titleVi, q, ex);
  } else if (lessonNum >= 41 && lessonNum <= 50) {
    return getRichGroup5Pool(lessonNum, topicId, titleEn, titleVi, q, ex);
  } else {
    return getRichGroup6Pool(lessonNum, topicId, titleEn, titleVi, q, ex);
  }
}

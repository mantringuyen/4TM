import { QuizQuestion, ExerciseItem } from '../../src/types';

export interface LessonContentAdditions {
  extraExercises: ExerciseItem[];
  extraQuizQuestions: QuizQuestion[];
}

export const basicAdditions: Record<string, LessonContentAdditions> = {};

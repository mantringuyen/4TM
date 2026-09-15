import fs from 'fs';
import path from 'path';
import { Lesson, QuizQuestion, ExerciseItem } from '../src/types';

import { basicLessons } from '../src/data/python/basicLessons';
import { pythonIntermediateLessonsPart1 } from '../src/data/python/intermediateLessonsPart1';
import { pythonIntermediateLessonsPart2 } from '../src/data/python/intermediateLessonsPart2';
import { pythonAdvancedLessonsPart1 } from '../src/data/python/advancedLessonsPart1';
import { pythonAdvancedLessonsPart2 } from '../src/data/python/advancedLessonsPart2';
import { pythonAdvancedLessonsPart3 } from '../src/data/python/advancedLessonsPart3';

// Helper for custom serializer with regex preservation
function serializeLesson(val: any, depth = 0): string {
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
    const items = val.map(item => nextSpaces + serializeLesson(item, depth + 1)).join(",\n");
    return "[\n" + items + "\n" + spaces + "]";
  }
  if (typeof val === "object") {
    const keys = Object.keys(val);
    if (keys.length === 0) return "{}";
    const entries = keys.map(k => {
      const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
      return `${nextSpaces}${formattedKey}: ${serializeLesson(val[k], depth + 1)}`;
    }).join(",\n");
    return "{\n" + entries + "\n" + spaces + "}";
  }
  return String(val);
}

// Function to generate rich questions for any lesson
export function generateQuestionsForLesson(lesson: Lesson, indexInCourse: number): QuizQuestion[] {
  const existing = lesson.quizQuestionPool || [];
  const topicId = lesson.topicId || `py_topic_${indexInCourse}`;
  const tEn = lesson.title.en;
  const tVi = lesson.title.vi;

  const result: QuizQuestion[] = [...existing];
  
  // Topic specific question matrix generators
  const basePool = getTopicSpecificQuestions(indexInCourse, topicId, tEn, tVi);
  
  for (const q of basePool) {
    if (!result.some(existingQ => existingQ.id === q.id)) {
      result.push(q);
    }
  }

  // Ensure unique IDs
  result.forEach((q, idx) => {
    q.id = `py_q_${indexInCourse}_${idx + 1}`;
    q.topicId = topicId;
  });

  return result;
}

// Function to generate rich exercises for any lesson
export function generateExercisesForLesson(lesson: Lesson, indexInCourse: number): ExerciseItem[] {
  const existing = lesson.exercisePool || [];
  const topicId = lesson.topicId || `py_topic_${indexInCourse}`;
  const tEn = lesson.title.en;
  const tVi = lesson.title.vi;

  const result: ExerciseItem[] = [...existing];
  const baseExercises = getTopicSpecificExercises(indexInCourse, topicId, tEn, tVi, lesson.learn);

  for (const ex of baseExercises) {
    if (!result.some(existingEx => existingEx.id === ex.id)) {
      result.push(ex);
    }
  }

  // Ensure unique IDs
  result.forEach((ex, idx) => {
    ex.id = `py_ex_${indexInCourse}_${idx + 1}`;
  });

  return result;
}

console.log("Builder initialized.");

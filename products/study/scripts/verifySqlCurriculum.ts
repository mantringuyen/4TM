import { sqlCourse } from '../src/data/sqlData';
import { sqlLessonsTier1 } from '../src/data/sql/sqlLessonsTier1';
import { sqlLessonsTier2 } from '../src/data/sql/sqlLessonsTier2';
import { sqlLessonsTier3 } from '../src/data/sql/sqlLessonsTier3';
import { sqlLessonsTier4 } from '../src/data/sql/sqlLessonsTier4';
import { Lesson } from '../src/types';

console.log('=== STARTING 4TM SQL CURRICULUM VERIFICATION ===\n');

const allLessons: Lesson[] = [
  ...sqlLessonsTier1,
  ...sqlLessonsTier2,
  ...sqlLessonsTier3,
  ...sqlLessonsTier4
];

console.log(`Total SQL Lessons Loaded: ${allLessons.length}`);

let errorCount = 0;
const lessonIds = new Set<string>();
const exerciseIds = new Set<string>();
const challengeIds = new Set<string>();
const quizIds = new Set<string>();

let totalExercises = 0;
let totalChallenges = 0;
let totalQuizzes = 0;

allLessons.forEach((lesson, index) => {
  const expectedOrder = index + 1;
  const expectedId = `sql_lesson_${expectedOrder}`;

  if (lesson.id !== expectedId) {
    console.error(`[ERROR] Lesson #${expectedOrder} has invalid id: ${lesson.id}`);
    errorCount++;
  }

  if (lessonIds.has(lesson.id)) {
    console.error(`[ERROR] Duplicate lesson ID: ${lesson.id}`);
    errorCount++;
  }
  lessonIds.add(lesson.id);

  if (lesson.order !== expectedOrder) {
    console.error(`[ERROR] Lesson ${lesson.id} has incorrect order: ${lesson.order}, expected ${expectedOrder}`);
    errorCount++;
  }

  // Check localization of Title & Summary
  if (!lesson.title.en || !lesson.title.vi) {
    console.error(`[ERROR] Lesson ${lesson.id} missing EN or VI title`);
    errorCount++;
  }
  if (!lesson.summary.en || !lesson.summary.vi) {
    console.error(`[ERROR] Lesson ${lesson.id} missing EN or VI summary`);
    errorCount++;
  }

  // Check Learn Section
  const learn = lesson.learn;
  if (!learn.introduction.en || !learn.introduction.vi) {
    console.error(`[ERROR] Lesson ${lesson.id} missing Learn introduction`);
    errorCount++;
  }
  if (!learn.conceptExplanation.en || !learn.conceptExplanation.vi) {
    console.error(`[ERROR] Lesson ${lesson.id} missing Learn conceptExplanation`);
    errorCount++;
  }
  if (!learn.syntax) {
    console.error(`[ERROR] Lesson ${lesson.id} missing Learn syntax`);
    errorCount++;
  }
  if (!learn.examples || learn.examples.length === 0) {
    console.error(`[ERROR] Lesson ${lesson.id} missing Learn examples`);
    errorCount++;
  }
  if (!learn.practice || !learn.practice.starterCode || !learn.practice.solutionCode) {
    console.error(`[ERROR] Lesson ${lesson.id} missing Learn practice or solutionCode`);
    errorCount++;
  }

  // Check Exercise Pool
  if (!lesson.exercisePool || lesson.exercisePool.length < 5) {
    console.error(`[ERROR] Lesson ${lesson.id} has only ${lesson.exercisePool?.length || 0} exercises (expected >= 5)`);
    errorCount++;
  }

  lesson.exercisePool?.forEach((ex, exIdx) => {
    totalExercises++;
    if (exerciseIds.has(ex.id)) {
      console.error(`[ERROR] Duplicate exercise ID: ${ex.id} in lesson ${lesson.id}`);
      errorCount++;
    }
    exerciseIds.add(ex.id);

    if (!ex.title.en || !ex.title.vi) {
      console.error(`[ERROR] Exercise ${ex.id} missing EN/VI title`);
      errorCount++;
    }
    if (!ex.instruction.en || !ex.instruction.vi) {
      console.error(`[ERROR] Exercise ${ex.id} missing EN/VI instruction`);
      errorCount++;
    }
    if (!ex.solutionCode) {
      console.error(`[ERROR] Exercise ${ex.id} missing solutionCode`);
      errorCount++;
    }
  });

  // Check Challenge & Challenge Pool
  if (!lesson.challenge || !lesson.challenge.solutionCode) {
    console.error(`[ERROR] Lesson ${lesson.id} missing main challenge or solutionCode`);
    errorCount++;
  } else {
    totalChallenges++;
    if (challengeIds.has(lesson.challenge.id)) {
      console.error(`[ERROR] Duplicate challenge ID: ${lesson.challenge.id}`);
      errorCount++;
    }
    challengeIds.add(lesson.challenge.id);
  }

  if (lesson.challengePool) {
    lesson.challengePool.forEach(ch => {
      totalChallenges++;
      if (challengeIds.has(ch.id)) {
        console.error(`[ERROR] Duplicate challenge variant ID: ${ch.id}`);
        errorCount++;
      }
      challengeIds.add(ch.id);
    });
  }

  // Check Quiz Question Pool
  if (!lesson.quizQuestionPool || lesson.quizQuestionPool.length < 15) {
    console.error(`[ERROR] Lesson ${lesson.id} has only ${lesson.quizQuestionPool?.length || 0} quiz questions (expected >= 15)`);
    errorCount++;
  }

  lesson.quizQuestionPool?.forEach((q, qIdx) => {
    totalQuizzes++;
    if (quizIds.has(q.id)) {
      console.error(`[ERROR] Duplicate quiz question ID: ${q.id} in lesson ${lesson.id}`);
      errorCount++;
    }
    quizIds.add(q.id);

    if (!q.question.en || !q.question.vi) {
      console.error(`[ERROR] Quiz ${q.id} missing EN/VI question text`);
      errorCount++;
    }
    if (!q.options || q.options.length < 2) {
      console.error(`[ERROR] Quiz ${q.id} has fewer than 2 options`);
      errorCount++;
    } else {
      q.options.forEach((opt, optIdx) => {
        if (!opt.en || !opt.vi) {
          console.error(`[ERROR] Quiz ${q.id} option #${optIdx} missing EN or VI text`);
          errorCount++;
        }
      });
    }

    if (!q.correctAnswers || q.correctAnswers.length === 0) {
      console.error(`[ERROR] Quiz ${q.id} missing correctAnswers`);
      errorCount++;
    } else {
      q.correctAnswers.forEach(ansIndex => {
        if (ansIndex < 0 || ansIndex >= q.options.length) {
          console.error(`[ERROR] Quiz ${q.id} correct answer index ${ansIndex} out of bounds (options length: ${q.options.length})`);
          errorCount++;
        }
      });
    }

    if (!q.explanation.en || !q.explanation.vi) {
      console.error(`[ERROR] Quiz ${q.id} missing EN/VI explanation`);
      errorCount++;
    }
  });
});

// Verify sqlCourse structure
const basicMods = sqlCourse.levels.basic.modules;
const interMods = sqlCourse.levels.intermediate.modules;
const advMods = sqlCourse.levels.advanced.modules;

const totalModules = basicMods.length + interMods.length + advMods.length;
console.log(`\nCourse Level Breakdown:`);
console.log(`- Basic Level Modules: ${basicMods.length} (${basicMods.map(m => `${m.id}: ${m.lessons.length} lessons`).join(', ')})`);
console.log(`- Intermediate Level Modules: ${interMods.length} (${interMods.map(m => `${m.id}: ${m.lessons.length} lessons`).join(', ')})`);
console.log(`- Advanced Level Modules: ${advMods.length} (${advMods.map(m => `${m.id}: ${m.lessons.length} lessons`).join(', ')})`);

console.log(`\nTotals:`);
console.log(`- Total Lessons: ${allLessons.length}`);
console.log(`- Total Modules: ${totalModules}`);
console.log(`- Total Exercises: ${totalExercises}`);
console.log(`- Total Challenges & Variants: ${totalChallenges}`);
console.log(`- Total Quiz Questions: ${totalQuizzes}`);
console.log(`- Total Verification Errors: ${errorCount}`);

if (errorCount === 0) {
  console.log('\n>>> SUCCESS: ALL 20 SQL LESSONS FULLY VALIDATED AND ERROR-FREE! <<<');
} else {
  console.error(`\n>>> FAILED: Found ${errorCount} errors during verification! <<<`);
  process.exit(1);
}

import { excelCourse } from '../src/data/excelData';
import { Lesson } from '../src/types';

console.log('=== RUNNING COMPREHENSIVE EXCEL CURRICULUM AUDIT ===\n');

let totalErrors = 0;
function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    totalErrors++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Level & Module Structure Checks
const basicLevels = excelCourse.levels.basic;
const intermediateLevels = excelCourse.levels.intermediate;
const advancedLevels = excelCourse.levels.advanced;

assert(!!basicLevels && !!intermediateLevels && !!advancedLevels, 'All 3 levels exist');

const basicLessons = basicLevels.modules.flatMap(m => m.lessons);
const intermediateLessons = intermediateLevels.modules.flatMap(m => m.lessons);
const advancedLessons = advancedLevels.modules.flatMap(m => m.lessons);
const allLessons = [...basicLessons, ...intermediateLessons, ...advancedLessons];

console.log(`\nLesson Counts:`);
console.log(`Basic: ${basicLessons.length} (Target: 8)`);
console.log(`Intermediate: ${intermediateLessons.length} (Target: 10)`);
console.log(`Advanced: ${advancedLessons.length} (Target: 6)`);
console.log(`Total: ${allLessons.length} (Target: 24)\n`);

assert(basicLessons.length === 8, 'Basic level contains exactly 8 lessons');
assert(intermediateLessons.length === 10, 'Intermediate level contains exactly 10 lessons');
assert(advancedLessons.length === 6, 'Advanced level contains exactly 6 lessons');
assert(allLessons.length === 24, 'Total curriculum contains exactly 24 lessons');

// 2. Preserved IDs Check
const preservedIds = [
  'excel_lesson_1',
  'excel_lesson_2',
  'excel_lesson_3',
  'excel_lesson_4',
  'excel_lesson_5',
  'excel_lesson_6',
  'excel_lesson_7',
  'excel_lesson_8',
  'excel_lesson_9',
  'excel_lesson_10',
  'excel_lesson_11'
];

for (const id of preservedIds) {
  const found = allLessons.find(l => l.id === id);
  assert(!!found, `Preserved lesson ID "${id}" exists in curriculum (Found at order: ${found?.order})`);
}

// 3. ID Uniqueness Check
const idSet = new Set<string>();
for (const lesson of allLessons) {
  if (idSet.has(lesson.id)) {
    assert(false, `Duplicate lesson ID found: ${lesson.id}`);
  }
  idSet.add(lesson.id);
}
assert(idSet.size === 24, 'All 24 lesson IDs are globally unique');

// 4. Sequential Orders Check
for (let i = 0; i < allLessons.length; i++) {
  const lesson = allLessons[i];
  assert(lesson.order === i + 1, `Lesson ${lesson.id} has sequential order ${i + 1} (actual: ${lesson.order})`);
}

// 5. Bilingual & Pedagogy Completeness Check
console.log('\nAuditing Bilingual and Pedagogical Completeness...');
let totalQuizzes = 0;
let totalExercises = 0;

for (const lesson of allLessons) {
  // Titles & Summary
  assert(!!lesson.title.en && !!lesson.title.vi, `Lesson ${lesson.id} has bilingual titles`);
  assert(!!lesson.summary.en && !!lesson.summary.vi, `Lesson ${lesson.id} has bilingual summaries`);
  
  // Learn section
  assert(!!lesson.learn.introduction.en && !!lesson.learn.introduction.vi, `Lesson ${lesson.id} has bilingual introduction`);
  assert(!!lesson.learn.conceptExplanation.en && !!lesson.learn.conceptExplanation.vi, `Lesson ${lesson.id} has bilingual conceptExplanation`);
  assert(!!lesson.learn.syntax, `Lesson ${lesson.id} has syntax guidance`);
  assert(lesson.learn.examples.length >= 1, `Lesson ${lesson.id} has examples`);

  // Exercise pool
  assert(lesson.exercisePool.length >= 1, `Lesson ${lesson.id} has at least 1 exercise in pool (${lesson.exercisePool.length})`);
  totalExercises += lesson.exercisePool.length;
  for (const ex of lesson.exercisePool) {
    assert(!!ex.title.en && !!ex.title.vi, `Exercise ${ex.id} in ${lesson.id} has bilingual title`);
    assert(!!ex.instruction.en && !!ex.instruction.vi, `Exercise ${ex.id} in ${lesson.id} has bilingual instruction`);
    assert(!!ex.solutionCode, `Exercise ${ex.id} in ${lesson.id} has solutionCode`);
  }

  // Challenge
  assert(!!lesson.challenge, `Lesson ${lesson.id} has a challenge`);
  assert(!!lesson.challenge.title.en && !!lesson.challenge.title.vi, `Challenge in ${lesson.id} has bilingual title`);
  assert(!!lesson.challenge.description.en && !!lesson.challenge.description.vi, `Challenge in ${lesson.id} has bilingual description`);
  assert(lesson.challenge.requirements.length >= 1, `Challenge in ${lesson.id} has requirements`);

  // Quiz pool (Target: 10 per lesson)
  assert(lesson.quizQuestionPool.length >= 6, `Lesson ${lesson.id} has robust quiz pool (Count: ${lesson.quizQuestionPool.length})`);
  totalQuizzes += lesson.quizQuestionPool.length;
  for (const q of lesson.quizQuestionPool) {
    assert(!!q.question.en && !!q.question.vi, `Quiz question ${q.id} in ${lesson.id} has bilingual text`);
    assert(q.options.every(o => !!o.en && !!o.vi), `Quiz question ${q.id} in ${lesson.id} has bilingual options`);
    assert(q.correctAnswers.length >= 1, `Quiz question ${q.id} in ${lesson.id} has correct answers defined`);
    assert(!!q.explanation.en && !!q.explanation.vi, `Quiz question ${q.id} in ${lesson.id} has bilingual explanation`);
  }
}

console.log(`\nPedagogy Metrics Summary:`);
console.log(`Total Lessons: ${allLessons.length}`);
console.log(`Total Exercises: ${totalExercises}`);
console.log(`Total Quiz Questions: ${totalQuizzes}`);

console.log('\nCurriculum Structure Overview:');
allLessons.forEach(l => {
  console.log(`[Order ${l.order.toString().padStart(2, '0')}] [${l.levelId.toUpperCase()}] ${l.id} -> ${l.title.en}`);
});

if (totalErrors === 0) {
  console.log('\n🎉 ALL 24 EXCEL LESSONS PASSED FULL AUDIT WITH ZERO ERRORS!');
} else {
  console.error(`\n🚨 AUDIT FAILED WITH ${totalErrors} ERRORS.`);
  process.exit(1);
}

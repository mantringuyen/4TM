import { javascriptCourse } from '../src/data/javascriptData';
import { allCourses } from '../src/data/coursesData';

console.log('=== JAVASCRIPT EXPANSION AUDIT ===\n');

const basicMod1 = javascriptCourse.levels.basic.modules[0].lessons;
const basicMod2 = javascriptCourse.levels.basic.modules[1].lessons;
const intMod1 = javascriptCourse.levels.intermediate.modules[0].lessons;
const intMod2 = javascriptCourse.levels.intermediate.modules[1].lessons;
const advMod1 = javascriptCourse.levels.advanced.modules[0].lessons;

console.log(`Basic Module 01: ${basicMod1.length} lessons`);
console.log(`Basic Module 02: ${basicMod2.length} lessons`);
console.log(`Intermediate Module 01: ${intMod1.length} lessons`);
console.log(`Intermediate Module 02: ${intMod2.length} lessons`);
console.log(`Advanced Module 01: ${advMod1.length} lessons`);

const totalJs = basicMod1.length + basicMod2.length + intMod1.length + intMod2.length + advMod1.length;
console.log(`\nTotal JavaScript Lessons: ${totalJs} (Target: 28)`);

if (totalJs !== 28) {
  console.error('ERROR: Total JS lessons is not 28!');
  process.exit(1);
}

const allJsLessons = [
  ...basicMod1,
  ...basicMod2,
  ...intMod1,
  ...intMod2,
  ...advMod1
];

// Check IDs, order, and bilingual integrity
const seenIds = new Set<string>();
let errors = 0;

allJsLessons.forEach((lesson, index) => {
  const expectedOrder = index + 1;
  if (lesson.order !== expectedOrder) {
    console.error(`Mismatch order at index ${index}: got ${lesson.order}, expected ${expectedOrder}`);
    errors++;
  }

  if (seenIds.has(lesson.id)) {
    console.error(`Duplicate lesson ID detected: ${lesson.id}`);
    errors++;
  }
  seenIds.add(lesson.id);

  // Check bilingual fields
  if (!lesson.title?.en || !lesson.title?.vi) {
    console.error(`Lesson ${lesson.id} missing bilingual title`);
    errors++;
  }
  if (!lesson.summary?.en || !lesson.summary?.vi) {
    console.error(`Lesson ${lesson.id} missing bilingual summary`);
    errors++;
  }
  if (!lesson.learn?.introduction?.en || !lesson.learn?.introduction?.vi) {
    console.error(`Lesson ${lesson.id} missing bilingual introduction`);
    errors++;
  }
  if (!lesson.learn?.conceptExplanation?.en || !lesson.learn?.conceptExplanation?.vi) {
    console.error(`Lesson ${lesson.id} missing bilingual conceptExplanation`);
    errors++;
  }
  if (!lesson.learn?.syntax) {
    console.error(`Lesson ${lesson.id} missing syntax`);
    errors++;
  }
  if (!lesson.exercisePool || lesson.exercisePool.length === 0) {
    console.error(`Lesson ${lesson.id} has empty exercisePool`);
    errors++;
  }
  if (!lesson.challenge) {
    console.error(`Lesson ${lesson.id} missing challenge`);
    errors++;
  }
  if (!lesson.quizQuestionPool || lesson.quizQuestionPool.length < 5) {
    console.error(`Lesson ${lesson.id} quizQuestionPool has less than 5 questions (${lesson.quizQuestionPool?.length})`);
    errors++;
  }
});

console.log(`\nLesson verification completed with ${errors} errors.`);

console.log('\n=== ALL COURSES AUDIT ===');
let grandTotal = 0;
allCourses.forEach(c => {
  const b = c.levels.basic ? c.levels.basic.modules.reduce((acc, m) => acc + m.lessons.length, 0) : 0;
  const i = c.levels.intermediate ? c.levels.intermediate.modules.reduce((acc, m) => acc + m.lessons.length, 0) : 0;
  const a = c.levels.advanced ? c.levels.advanced.modules.reduce((acc, m) => acc + m.lessons.length, 0) : 0;
  const t = b + i + a;
  grandTotal += t;
  console.log(`* ${c.title.en}: Basic ${b}, Intermediate ${i}, Advanced ${a} = ${t}`);
});
console.log(`\nGrand Total Curriculum Lessons: ${grandTotal}`);

if (errors > 0) {
  process.exit(1);
} else {
  console.log('\nAll checks passed successfully!');
}

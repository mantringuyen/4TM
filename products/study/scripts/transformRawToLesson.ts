import { RawLessonSource } from './rawLessonType';
import { Lesson, ExerciseItem, QuizQuestion, ChallengeItem } from '../src/types';

export function transformRawToLesson(raw: RawLessonSource): Lesson {
  const exercises: ExerciseItem[] = raw.exercises.map(ex => ({
    id: ex.id,
    type: ex.type as any,
    title: {
      en: ex.titleEn,
      vi: ex.titleVi
    },
    instruction: {
      en: ex.instEn,
      vi: ex.instVi
    },
    starterCode: ex.starter,
    solutionCode: ex.solution,
    hint: ex.hintEn ? {
      en: ex.hintEn,
      vi: ex.hintVi || ex.hintEn
    } : undefined,
    explanation: ex.expEn ? {
      en: ex.expEn,
      vi: ex.expVi || ex.expEn
    } : undefined
  }));

  const challengeVariants: ChallengeItem[] = raw.challengeVariants.map(v => ({
    id: v.id,
    title: {
      en: v.titleEn,
      vi: v.titleVi
    },
    description: {
      en: v.descEn,
      vi: v.descVi
    },
    requirements: v.requirements,
    starterCode: v.starter,
    solutionCode: v.solution,
    hints: v.hints || [
      { en: 'Review the challenge requirements carefully.', vi: 'Đọc kỹ các yêu cầu của thử thách.' }
    ],
    solutionExplanation: {
      en: v.expEn,
      vi: v.expVi
    }
  }));

  const primaryChallenge: ChallengeItem & { variants?: ChallengeItem[] } = {
    id: raw.challenge.id,
    title: {
      en: raw.challenge.titleEn,
      vi: raw.challenge.titleVi
    },
    description: {
      en: raw.challenge.descEn,
      vi: raw.challenge.descVi
    },
    requirements: raw.challenge.requirements,
    starterCode: raw.challenge.starter,
    solutionCode: raw.challenge.solution,
    hints: raw.challenge.hints,
    solutionExplanation: {
      en: raw.challenge.expEn,
      vi: raw.challenge.expVi
    },
    variants: challengeVariants
  };

  const quizQuestionPool: QuizQuestion[] = raw.quizzes.map(q => ({
    id: q.id,
    type: q.type as any,
    question: {
      en: q.qEn,
      vi: q.qVi
    },
    options: q.options,
    correctAnswers: [q.ans],
    explanation: {
      en: q.expEn,
      vi: q.expVi
    },
    topicId: raw.topicId,
    difficulty: q.difficulty || 'medium'
  }));

  return {
    id: raw.id,
    moduleId: raw.moduleId,
    levelId: raw.levelId,
    courseId: 'html',
    order: raw.order,
    topicId: raw.topicId,
    title: {
      en: raw.titleEn,
      vi: raw.titleVi
    },
    summary: {
      en: raw.summaryEn,
      vi: raw.summaryVi
    },
    estimatedMinutes: raw.estimatedMinutes || 15,
    learn: {
      introduction: {
        en: raw.introEn,
        vi: raw.introVi
      },
      conceptExplanation: {
        en: raw.conceptEn,
        vi: raw.conceptVi
      },
      syntax: raw.syntax,
      examples: [
        {
          title: {
            en: raw.ex1TitleEn,
            vi: raw.ex1TitleVi
          },
          code: raw.ex1Code,
          language: 'html',
          explanation: {
            en: raw.ex1ExpEn,
            vi: raw.ex1ExpVi
          }
        },
        {
          title: {
            en: raw.ex2TitleEn,
            vi: raw.ex2TitleVi
          },
          code: raw.ex2Code,
          language: 'html',
          explanation: {
            en: raw.ex2ExpEn,
            vi: raw.ex2ExpVi
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: raw.mistake1En,
            vi: raw.mistake1Vi
          },
          correction: {
            en: raw.correction1En,
            vi: raw.correction1Vi
          },
          code: '<!-- Correct usage demonstrated in lesson examples -->'
        },
        {
          mistake: {
            en: raw.mistake2En,
            vi: raw.mistake2Vi
          },
          correction: {
            en: raw.correction2En,
            vi: raw.correction2Vi
          },
          code: '<!-- Follow W3C semantic guidelines -->'
        }
      ],
      tips: [
        {
          en: raw.tipEn,
          vi: raw.tipVi
        }
      ],
      practice: {
        task: {
          en: raw.practiceTaskEn,
          vi: raw.practiceTaskVi
        },
        instruction: {
          en: raw.practiceInstEn,
          vi: raw.practiceInstVi
        },
        starterCode: raw.practiceStarter,
        solutionCode: raw.practiceSolution,
        requiredPatterns: raw.practicePatterns,
        hint: {
          en: raw.practiceHintEn,
          vi: raw.practiceHintVi
        }
      },
      consolidationPractice: {
        task: {
          en: raw.practiceTaskEn + ' (Consolidation)',
          vi: raw.practiceTaskVi + ' (Củng cố)'
        },
        instruction: {
          en: raw.practiceInstEn,
          vi: raw.practiceInstVi
        },
        starterCode: raw.practiceStarter,
        solutionCode: raw.practiceSolution,
        requiredPatterns: raw.practicePatterns,
        hint: {
          en: raw.practiceHintEn,
          vi: raw.practiceHintVi
        }
      }
    },
    exercisePool: exercises,
    challenge: primaryChallenge,
    challengePool: [primaryChallenge, ...challengeVariants],
    quizQuestionPool: quizQuestionPool
  };
}

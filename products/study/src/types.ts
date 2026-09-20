export type Language = 'en' | 'vi';

export type LevelId = 'basic' | 'intermediate' | 'advanced';

export type CourseId = 'python' | 'excel' | 'sql' | 'html' | 'css' | 'javascript' | 'powerbi' | 'ai';

export type LessonStage = 'learn' | 'exercises' | 'challenge' | 'quiz' | 'project';

export interface LocalizedString {
  en: string;
  vi: string;
}

export interface CodeExample {
  title: LocalizedString;
  description?: LocalizedString;
  code: string;
  language?: string;
  outputPreview?: string;
  explanation?: LocalizedString;
}

export interface LearnPractice {
  task?: LocalizedString;
  instruction?: LocalizedString;
  starterCode: string;
  solutionCode?: string;
  expectedOutput?: string;
  requiredPatterns?: (string | RegExp)[];
  forbiddenPatterns?: (string | RegExp)[];
  hint?: LocalizedString;
  explanation?: LocalizedString;
}

export interface LearnSection {
  introduction: LocalizedString;
  conceptExplanation: LocalizedString;
  syntax?: string;
  examples: CodeExample[];
  commonMistakes?: {
    mistake: LocalizedString;
    correction: LocalizedString;
    code?: string;
  }[];
  tips?: LocalizedString[];
  keyTakeaways?: LocalizedString[];
  practiceStarterCode?: string;
  practice?: LearnPractice;
  practicePool?: LearnPractice[];
  consolidationPractice?: LearnPractice;
  consolidationPracticePool?: LearnPractice[];
}

export type ExerciseType = 'fix_code' | 'replace_value' | 'complete_code' | 'predict_output' | 'modify_example' | 'write_code' | 'problem_solving';

export interface ExerciseItem {
  id: string;
  type: ExerciseType;
  title: LocalizedString;
  instruction: LocalizedString;
  starterCode: string;
  solutionCode: string;
  expectedOutput?: string;
  options?: string[]; // for predict output
  correctOptionIndex?: number;
  hint?: LocalizedString;
  explanation?: LocalizedString;
}

export interface TestCase {
  input?: string;
  expectedOutput: string;
  description?: string;
}

export interface ChallengeItem {
  variants?: any[];
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  requirements: LocalizedString[];
  starterCode: string;
  solutionCode: string;
  hints: LocalizedString[];
  testCases?: TestCase[];
  solutionExplanation?: LocalizedString;
}

export type QuizQuestionType = 
  | 'single_choice' 
  | 'multiple_choice' 
  | 'true_false' 
  | 'fill_blank' 
  | 'predict_output' 
  | 'arrange_code'
  | 'sql_result';

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: LocalizedString;
  codeSnippet?: string;
  options: LocalizedString[];
  correctAnswers: number[]; // index of correct options
  fillBlankAnswers?: string[]; // lowercase trimmed accepted answers
  explanation: LocalizedString;
  topicId: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ProjectItem {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: string;
  requirements: LocalizedString[];
  starterCode: string;
  solutionCode?: string;
  hints?: LocalizedString[];
  solutionExplanation?: LocalizedString;
}

export type ProjectSpec = ProjectItem;
export type ChallengeSpec = ChallengeItem;

export interface Lesson {
  id: string;
  moduleId?: string;
  levelId: LevelId;
  courseId: CourseId;
  order: number;
  title: LocalizedString;
  summary: LocalizedString;
  topicId: string;
  estimatedMinutes?: number;
  learn: LearnSection;
  exercisePool: ExerciseItem[];
  challenge: ChallengeItem;
  challengePool?: ChallengeItem[];
  quizQuestionPool: QuizQuestion[];
  project?: ProjectItem;
  isPublished?: boolean;
}

export interface Module {
  id: string;
  levelId: LevelId;
  courseId: CourseId;
  order: number;
  title: LocalizedString;
  description: LocalizedString;
  lessons: Lesson[];
}

export interface Level {
  id: LevelId;
  courseId: CourseId;
  title: LocalizedString;
  description: LocalizedString;
  order: number;
  modules: Module[];
}

export interface Course {
  id: CourseId;
  title: LocalizedString;
  description: LocalizedString;
  tagline: LocalizedString;
  iconName: string;
  color: string;
  accentBg: string;
  learningObjectives?: LocalizedString[];
  whatYouWillLearn?: LocalizedString[];
  prerequisites?: LocalizedString[];
  targetAudience?: LocalizedString[];
  levels: {
    basic: Level;
    intermediate: Level;
    advanced: Level;
  };
}

export type AccountStatus = 'pending_verification' | 'pending_approval' | 'active' | 'suspended';

export type MfaAssuranceLevel = 'aal1' | 'aal2';

export interface MfaFactor {
  id: string;
  factorType: 'totp';
  friendlyName?: string;
  status: 'verified' | 'unverified';
  createdAt: string;
  updatedAt: string;
}

export interface MfaAssuranceResult {
  currentLevel: MfaAssuranceLevel | null;
  nextLevel: MfaAssuranceLevel | null;
  currentAuthenticationMethods?: any[];
}

export interface MfaEnrollResult {
  factorId: string;
  secret: string;
  qrCodeSvg: string;
  uri: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  preferredLanguage: Language;
  role: 'user' | 'admin';
  status?: AccountStatus;
  emailVerified?: boolean;
  approvedAt?: string;
  approvedBy?: string;
  xp: number;
  streak: number;
  lastActiveDate: string;
  createdAt: string;
  lessonProgress: Record<string, LessonProgress>;
  topicMastery: Record<string, number>;
  bookmarks: BookmarkItem[];
  notes: NoteItem[];
  achievements: {
    id: string;
    title: LocalizedString;
    description: LocalizedString;
    icon: string;
    category: string;
    unlocked: boolean;
    unlockedAt?: string;
  }[];
}

export interface LessonProgress {
  lessonId: string;
  courseId: CourseId;
  levelId: LevelId;
  learnCompleted: boolean;
  exercisesCompleted: boolean;
  challengeCompleted: boolean;
  challengeSolutionViewed: boolean;
  quizPassed: boolean;
  quizScore: number;
  bestQuizScore?: number;
  quizAttemptsCount: number;
  projectCompleted: boolean;
  isCompleted?: boolean;
  completedAt?: string;
  updatedAt: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  lessonId: string;
  score: number;
  passed: boolean;
  totalQuestions: number;
  incorrectQuestionIds: string[];
  completedAt: string;
}

export interface TopicMastery {
  topicId: string;
  courseId: CourseId;
  percentage: number; // 0 to 100
  totalAttempts: number;
  successfulAttempts: number;
  lastUpdated: string;
}

export interface Badge {
  id: string;
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
  category: 'lesson' | 'exercise' | 'challenge' | 'quiz' | 'project' | 'streak' | 'course';
  unlockedAt?: string;
}

export interface BookmarkItem {
  id: string;
  userId: string;
  courseId: CourseId;
  levelId: LevelId;
  lessonId: string;
  lessonTitle: LocalizedString;
  createdAt: string;
}

export interface NoteItem {
  id: string;
  userId: string;
  courseId: CourseId;
  levelId: LevelId;
  lessonId: string;
  lessonTitle: LocalizedString;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiffLine {
  lineNum: number;
  type: 'unchanged' | 'removed' | 'added' | 'modified';
  oldContent?: string;
  newContent?: string;
  content: string;
}

export interface SuggestedFix {
  title: string;
  explanation: string;
  lineNumber?: number;
  fixedCode: string;
  diffLines: DiffLine[];
  originalCode: string;
}

export interface CodeErrorDetail {
  errorType: string;
  message: string;
  simpleExplanation?: string;
  whatToCheck?: string;
  lineNumber?: number;
  columnNumber?: number;
  rawTraceback?: string;
  suggestedFix?: SuggestedFix | null;
}

export interface CodeExecutionResult {
  isSuccess: boolean;
  output: string;
  error?: string;
  detailedError?: string;
  simpleExplanation?: string;
  whatToCheck?: string;
  executionTimeMs: number;
  errorDetail?: CodeErrorDetail;
}

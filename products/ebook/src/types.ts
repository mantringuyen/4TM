export type Language = 'en' | 'vi';

export type BookType = 
  | 'Handbook'
  | 'Definitions'
  | 'Tips'
  | 'Common Errors'
  | 'Best Practices'
  | 'Practical Guides'
  | 'Patterns / Recipes';

export interface EbookField {
  id: string;
  name: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  domains: string[];
}

export interface EbookDomain {
  id: string;
  fieldId: string;
  name: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  topics: string[];
  icon: string;
}

export interface EbookTopic {
  id: string;
  domainIds: string[];
  name: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  icon: string;
}

export type Category = EbookTopic;

export interface Subject {
  id: string;
  categoryId: string;
  name: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
}

export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
  explanation?: {
    en: string;
    vi: string;
  };
}

export interface CommonMistakeItem {
  mistake: { en: string; vi: string };
  why: { en: string; vi: string };
  solution: { en: string; vi: string };
  codeIncorrect?: string;
  codeCorrect?: string;
}

export interface ComparisonMatrix {
  headers: { en: string; vi: string }[];
  rows: { en: string[]; vi: string[] }[];
}

export interface ProcessDiagram {
  title: { en: string; vi: string };
  steps: {
    number: number;
    label: { en: string; vi: string };
    description: { en: string; vi: string };
  }[];
}

export interface DeepDiveItem {
  title: { en: string; vi: string };
  badge?: { en: string; vi: string };
  content: { en: string; vi: string };
  codeBlock?: CodeBlock;
}

export interface SelfReviewItem {
  question: { en: string; vi: string };
  hint?: { en: string; vi: string };
  answer: { en: string; vi: string };
}

export interface ChapterSummary {
  mentalModels: { en: string[]; vi: string[] };
  rules: { en: string[]; vi: string[] };
  commonTraps: { en: string[]; vi: string[] };
  takeaway: { en: string; vi: string };
}

export interface ChapterPart {
  number: number;
  romanNumeral: string;
  title: {
    en: string;
    vi: string;
  };
  description?: {
    en: string;
    vi: string;
  };
}

export interface ChapterSection {
  id: string;
  title: {
    en: string;
    vi: string;
  };
  content: {
    en: string;
    vi: string;
  };
  keyIdea?: {
    en: string;
    vi: string;
  };
  codeBlock?: CodeBlock;
  whenToUse?: {
    use: { en: string[]; vi: string[] };
    avoid?: { en: string[]; vi: string[] };
  };
  commonMistakes?: CommonMistakeItem[];
  comparisonTable?: ComparisonMatrix;
  diagram?: ProcessDiagram;
  deepDive?: DeepDiveItem;
  bestPractices?: {
    en: string[];
    vi: string[];
  };
  practicalScenario?: {
    en: string;
    vi: string;
  };
  relatedConcepts?: {
    en: string[];
    vi: string[];
  };
  studyLink?: {
    topicSlug: string;
    label: { en: string; vi: string };
  };
  keyTakeaways?: {
    en: string[];
    vi: string[];
  };
}

export interface Chapter {
  id: string;
  number: number;
  partNumber?: number;
  partTitle?: {
    en: string;
    vi: string;
  };
  slug: string;
  title: {
    en: string;
    vi: string;
  };
  summary: {
    en: string;
    vi: string;
  };
  readTimeMinutes: number;
  sections: ChapterSection[];
  chapterSummary?: ChapterSummary;
  selfReview?: SelfReviewItem[];
}

export interface GlossaryEntry {
  term: string;
  vietnameseTerm?: string;
  category?: string;
  definition: {
    en: string;
    vi: string;
  };
  relatedChapter?: number;
}

export interface ReferenceItem {
  title: string;
  authorOrSource: string;
  year?: string;
  url?: string;
  description: {
    en: string;
    vi: string;
  };
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle: {
    en: string;
    vi: string;
  };
  bookType: BookType;
  fieldId?: string;
  domainIds?: string[];
  topicId?: string;
  categoryId: string;
  subjectId: string;
  author: string;
  role: string;
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  estimatedReadTime: string;
  chaptersCount: number;
  publishedDate: string;
  accentColor: string;
  tags: string[];
  description: {
    en: string;
    vi: string;
  };
  prerequisites: {
    en: string[];
    vi: string[];
  };
  outcomes: {
    en: string[];
    vi: string[];
  };
  parts?: ChapterPart[];
  glossary?: GlossaryEntry[];
  furtherReading?: ReferenceItem[];
  references?: ReferenceItem[];
  chapters: Chapter[];
}

export type ReaderFontSize = 'sm' | 'md' | 'lg' | 'xl';
export type ReaderWidth = 'compact' | 'standard' | 'wide';
export type ReaderPaperTheme = 'default' | 'sepia' | 'dark' | 'midnight';

export interface ReaderSettings {
  fontSize: ReaderFontSize;
  width: ReaderWidth;
  paperTheme: ReaderPaperTheme;
}

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
  codeBlock?: CodeBlock;
  keyTakeaways?: {
    en: string[];
    vi: string[];
  };
}

export interface Chapter {
  id: string;
  number: number;
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

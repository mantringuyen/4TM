export type Language = 'en' | 'vi';

export type ToolCategory =
  | 'data'
  | 'text'
  | 'developer'
  | 'design'
  | 'generators'
  | 'encoding'
  | 'formatters'
  | 'crypto'
  | 'network';

export type StudyRelation =
  | 'Python'
  | 'SQL'
  | 'HTML'
  | 'CSS'
  | 'JavaScript'
  | 'Excel'
  | 'Power BI'
  | 'AI'
  | 'None';

export type ToolId =
  | 'data-converter'
  | 'text-case-converter'
  | 'sql-formatter'
  | 'encoder-decoder'
  | 'css-generator'
  | 'qr-generator'
  | 'base64'
  | 'json'
  | 'hasher'
  | 'jwt'
  | 'uuid'
  | 'timestamp';

export interface ToolItem {
  id: ToolId;
  slug: string;
  name: string;
  tagline: {
    en: string;
    vi: string;
  };
  category: ToolCategory;
  icon: string;
  badge: string;
  accentColor: string;
  studyRelation: StudyRelation[];
  seoTitle: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  keywords: string[];
  isPhase1Flagship?: boolean;
}

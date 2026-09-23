export type Language = 'en' | 'vi';

export type ToolCategory =
  | 'developer'
  | 'excel'
  | 'powerbi'
  | 'sql'
  | 'python'
  | 'ai'
  | 'web';

export type StudyRelation =
  | 'Python'
  | 'SQL'
  | 'HTML'
  | 'CSS'
  | 'JavaScript'
  | 'Excel'
  | 'Power BI'
  | 'DAX'
  | 'AI'
  | 'None';

export type ToolId =
  // Developer
  | 'data-converter'
  | 'json-formatter'
  | 'jsonpath-explorer'
  | 'regex-playground'
  | 'jwt-debugger'
  | 'http-request-builder'
  | 'cron-builder'
  | 'encoder-decoder'
  | 'crypto-hasher'
  | 'uuid-generator'
  | 'unix-timestamp'
  | 'text-case-converter'

  // Excel
  | 'excel-formula-explainer'
  | 'excel-formula-builder'
  | 'excel-formula-debugger'

  // Power BI / DAX
  | 'dax-explainer'
  | 'dax-time-intelligence'
  | 'powerquery-m-explainer'

  // SQL
  | 'sql-join-visualizer'
  | 'sql-null-tester'
  | 'sql-query-explainer'
  | 'sql-formatter'

  // Python
  | 'python-error-explainer'
  | 'python-structure-visualizer'
  | 'python-complexity-inspector'
  | 'pandas-expression-explorer'

  // AI & Generative Engineering
  | 'prompt-structure-analyzer'
  | 'prompt-diff'
  | 'rag-chunking-playground'
  | 'json-schema-prompt-builder'
  | 'react-trace-visualizer'
  | 'prompt-defense-playground'

  // Web / Frontend
  | 'css-specificity-calculator'
  | 'css-layout-generator'
  | 'html-accessibility-inspector'
  | 'url-inspector'
  | 'qr-generator'

  // Compatibility aliases
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
  isFeatured?: boolean;
}

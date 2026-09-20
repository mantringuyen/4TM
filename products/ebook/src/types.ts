export type Language = 'en' | 'vi';

export type LocalizedString = {
  en: string;
  vi: string;
};

export type LocalizedArray = {
  en: string[];
  vi: string[];
};

export type BookType = 
  | 'Handbook'
  | 'Definitions'
  | 'Tips'
  | 'Practical Guides'
  | 'Common Errors'
  | 'Best Practices'
  | 'Patterns / Recipes';

export interface EbookField {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  domains: string[];
}

export interface EbookDomain {
  id: string;
  fieldId: string;
  name: LocalizedString;
  description: LocalizedString;
  topics: string[];
  icon: string;
}

export interface EbookTopic {
  id: string;
  domainIds: string[];
  name: LocalizedString;
  description: LocalizedString;
  icon: string;
}

export type Category = EbookTopic;

export interface Subject {
  id: string;
  categoryId: string;
  name: LocalizedString;
  description: LocalizedString;
}

export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
  explanation?: LocalizedString;
}

export interface CommonMistakeItem {
  mistake: LocalizedString;
  why: LocalizedString;
  solution: LocalizedString;
  codeIncorrect?: string;
  codeCorrect?: string;
}

export interface ComparisonMatrix {
  headers: LocalizedString[];
  rows: { en: string[]; vi: string[] }[];
}

export interface ProcessDiagram {
  title: LocalizedString;
  steps: {
    number: number;
    label: LocalizedString;
    description: LocalizedString;
  }[];
}

export interface DeepDiveItem {
  title: LocalizedString;
  badge?: LocalizedString;
  content: LocalizedString;
  codeBlock?: CodeBlock;
}

export interface SelfReviewItem {
  question: LocalizedString;
  hint?: LocalizedString;
  answer: LocalizedString;
}

export interface ChapterSummary {
  mentalModels: LocalizedArray;
  rules: LocalizedArray;
  commonTraps: LocalizedArray;
  takeaway: LocalizedString;
}

export interface ChapterPart {
  number: number;
  romanNumeral: string;
  title: LocalizedString;
  description?: LocalizedString;
}

// ---------------------------------------------------------------------------
// 7 PUBLICATION TYPES — SPECIALIZED EDITORIAL MODELS
// ---------------------------------------------------------------------------

// 1. Definitions Model: Concept -> Definition -> Mental Model -> Why It Matters -> Misconception -> Quick Ref
export interface DefinitionSectionDetails {
  term?: LocalizedString;
  formalDefinition?: LocalizedString;
  mentalModel?: LocalizedString;
  whyItMatters?: LocalizedString;
  commonMisconception?: LocalizedString;
  quickReference?: LocalizedArray;
}

// 2. Tips Model: Problem / Situation -> Quick Insight -> Recommended Pattern -> Why It Works -> Takeaway
export interface TipSectionDetails {
  problemSituation?: LocalizedString;
  quickInsight?: LocalizedString;
  recommendedPattern?: LocalizedString;
  whyItWorks?: LocalizedString;
  pitfallOrLimitation?: LocalizedString;
  quickTakeaway?: LocalizedString;
}

// 3. Practical Guides Model: Goal -> Prerequisites -> Step-by-Step -> Verification -> Troubleshooting -> Checklist
export interface GuideStepItem {
  stepNumber: number;
  title: LocalizedString;
  instruction: LocalizedString;
  codeBlock?: CodeBlock;
  expectedOutput?: LocalizedString;
  warningOrNote?: LocalizedString;
}

export interface TroubleshootingItem {
  symptom: LocalizedString;
  cause: LocalizedString;
  fix: LocalizedString;
}

export interface GuideSectionDetails {
  goal?: LocalizedString;
  prerequisites?: LocalizedArray;
  preparation?: LocalizedString;
  steps?: GuideStepItem[];
  verification?: LocalizedString;
  troubleshooting?: TroubleshootingItem[];
  checklist?: LocalizedArray;
}

// 4. Common Errors Model: Error -> Symptoms -> Minimal Reproduction -> Why It Happens -> Diagnosis -> Fix -> Prevention
export interface ErrorSectionDetails {
  errorSignature?: LocalizedString;
  symptoms?: LocalizedArray;
  minimalReproduction?: CodeBlock;
  whyItHappens?: LocalizedString;
  diagnosisSteps?: LocalizedArray;
  correctFix?: CodeBlock;
  fixExplanation?: LocalizedString;
  preventionRules?: LocalizedArray;
}

// 5. Best Practices Model: Context -> Recommended Practice -> Why -> Good vs Risky -> Trade-offs -> Checklist
export interface PracticeSectionDetails {
  context?: LocalizedString;
  recommendedPractice?: LocalizedString;
  whyItMatters?: LocalizedString;
  goodExample?: CodeBlock;
  riskyExample?: CodeBlock;
  tradeOffs?: LocalizedArray;
  exceptions?: LocalizedArray;
  checklist?: LocalizedArray;
}

// 6. Patterns / Recipes Model: Problem -> Context -> Solution -> Implementation -> Variations -> Trade-offs -> Gotchas
export interface PatternVariationItem {
  name: LocalizedString;
  description: LocalizedString;
  codeBlock?: CodeBlock;
}

export interface PatternSectionDetails {
  problem?: LocalizedString;
  context?: LocalizedString;
  solutionOverview?: LocalizedString;
  architectureDiagram?: ProcessDiagram;
  implementation?: CodeBlock;
  explanation?: LocalizedString;
  variations?: PatternVariationItem[];
  tradeOffs?: LocalizedArray;
  gotchas?: LocalizedArray;
  whenNotToUse?: LocalizedArray;
  relatedPatterns?: LocalizedArray;
}

export interface ChapterSection {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  keyIdea?: LocalizedString;
  codeBlock?: CodeBlock;
  whenToUse?: {
    use: LocalizedArray;
    avoid?: LocalizedArray;
  };
  commonMistakes?: CommonMistakeItem[];
  comparisonTable?: ComparisonMatrix;
  diagram?: ProcessDiagram;
  deepDive?: DeepDiveItem;
  bestPractices?: LocalizedArray;
  practicalScenario?: LocalizedString;
  relatedConcepts?: LocalizedArray;
  studyLink?: {
    topicSlug: string;
    label: LocalizedString;
  };
  keyTakeaways?: LocalizedArray;

  // Publication-type specialized extensions (optional, composable)
  definitionDetails?: DefinitionSectionDetails;
  tipDetails?: TipSectionDetails;
  guideDetails?: GuideSectionDetails;
  errorDetails?: ErrorSectionDetails;
  practiceDetails?: PracticeSectionDetails;
  patternDetails?: PatternSectionDetails;
}

export interface Chapter {
  id: string;
  number: number;
  partNumber?: number;
  partTitle?: LocalizedString;
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  readTimeMinutes: number;
  sections: ChapterSection[];
  chapterSummary?: ChapterSummary;
  selfReview?: SelfReviewItem[];
}

export interface GlossaryEntry {
  term: string;
  vietnameseTerm?: string;
  category?: string;
  definition: LocalizedString;
  relatedChapter?: number;
}

export interface ReferenceItem {
  title: string;
  authorOrSource: string;
  year?: string;
  url?: string;
  description: LocalizedString;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle: LocalizedString;
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
  description: LocalizedString;
  prerequisites: LocalizedArray;
  outcomes: LocalizedArray;
  parts?: ChapterPart[];
  glossary?: GlossaryEntry[];
  furtherReading?: ReferenceItem[];
  references?: ReferenceItem[];
  chapters: Chapter[];
}

// ---------------------------------------------------------------------------
// PUBLICATION TEMPLATE REGISTRY TYPES
// ---------------------------------------------------------------------------

export type LayoutDensity = 
  | 'deep-handbook'
  | 'reference-cards'
  | 'scannable-tips'
  | 'procedural-steps'
  | 'diagnostic-flow'
  | 'tradeoff-matrix'
  | 'solution-recipe';

export type NavigationStyle = 
  | 'parts-and-chapters'
  | 'concept-index'
  | 'tip-stream'
  | 'step-workflow'
  | 'error-catalog'
  | 'practice-matrix'
  | 'pattern-library';

export interface PublicationTemplate {
  id: BookType;
  slug: string;
  name: LocalizedString;
  tagline: LocalizedString;
  purpose: LocalizedString;
  editorialStructure: LocalizedArray;
  recommendedPrimitives: string[];
  visualStyle: {
    badgeTone: string;
    accentColor: string;
    layoutDensity: LayoutDensity;
    openerLabel: LocalizedString;
    iconName: string;
  };
  navigationStyle: NavigationStyle;
  readingPacing: LocalizedString;
}

export type ReaderFontSize = 'sm' | 'md' | 'lg' | 'xl';
export type ReaderWidth = 'compact' | 'standard' | 'wide';
export type ReaderPaperTheme = 'default' | 'sepia' | 'dark' | 'midnight';

export interface ReaderSettings {
  fontSize: ReaderFontSize;
  width: ReaderWidth;
  paperTheme: ReaderPaperTheme;
}

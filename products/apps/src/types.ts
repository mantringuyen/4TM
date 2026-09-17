export type Language = 'en' | 'vi';

export type AppCategory = 'productivity' | 'devtools' | 'system' | 'learning' | 'creative';

export type AppStatus = 'Production' | 'Beta' | 'Showcase';

export interface AppItem {
  id: string;
  slug: string;
  name: string;
  tagline: {
    en: string;
    vi: string;
  };
  category: AppCategory;
  status: AppStatus;
  version: string;
  icon: string;
  badge: string;
  accentColor: string;
  description: {
    en: string;
    vi: string;
  };
  keyFeatures: {
    en: string[];
    vi: string[];
  };
  techSpecs: string[];
  launchUrl?: string;
  hasInteractiveSandbox: boolean;
}

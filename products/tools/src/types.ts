export type Language = 'en' | 'vi';

export type ToolCategory = 'encoding' | 'formatters' | 'crypto' | 'network' | 'generators';

export type ToolId = 'base64' | 'json' | 'hasher' | 'jwt' | 'uuid' | 'timestamp';

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
  description: {
    en: string;
    vi: string;
  };
  keywords: string[];
}

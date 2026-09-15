import React, { createContext, useContext, useState } from 'react';
import { Language, LocalizedString, translations } from './translations';

interface LanguageContextType {
  language: Language;
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (localized?: LocalizedString | string) => string;
  dict: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('4tm_preferred_language') as Language;
    return saved === 'vi' ? 'vi' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('4tm_preferred_language', lang);
    } catch {
      // Ignore storage errors
    }
  };

  const t = (localized?: LocalizedString | string): string => {
    if (!localized) return '';
    if (typeof localized === 'string') return localized;
    return localized[language] || localized.en || '';
  };

  const dict = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, currentLanguage: language, setLanguage, t, dict }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

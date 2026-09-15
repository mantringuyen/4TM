import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LocalizedString } from '../types';
import { translations } from './translations';

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
    const saved = localStorage.getItem('4tm_preferred_language') as Language;
    return saved === 'vi' ? 'vi' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('4tm_preferred_language', lang);
    try {
      const rawUser = localStorage.getItem('4tm_code_user_profile');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (parsed && parsed.preferredLanguage !== lang) {
          parsed.preferredLanguage = lang;
          localStorage.setItem('4tm_code_user_profile', JSON.stringify(parsed));
        }
      }
    } catch (e) {
      // ignore
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

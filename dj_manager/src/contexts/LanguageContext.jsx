import { createContext, useContext, useState, useEffect } from 'react';
import { getLanguage, setLanguage as saveLanguage, t } from '../i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => getLanguage());

  const setLanguage = (lang) => {
    setLanguageState(lang);
    saveLanguage(lang);
  };

  const translate = (key) => t(key, language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

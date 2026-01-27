import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './en';
import { am } from './am';

const resources = {
  en: { translation: en },
  am: { translation: am },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // order and from where user language should be detected
      order: ['localStorage', 'navigator', 'htmlTag'],
      
      // keys or params to lookup language from
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,

      // cache user language on
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'],

      // optional htmlTag with lang attribute, the default is:
      htmlTag: document.documentElement,
    },
  });

export default i18n;
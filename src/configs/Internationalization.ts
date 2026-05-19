import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: [
      'en',
      'hi',
      'as',
      'bn',
      'gu',
      'kn',
      'gom',
      'ml',
      'mni',
      'mr',
      'or',
      'pa',
      'ta',
      'te',
      'ur',
      'ne',
    ],
    fallbackLng: 'en',
    detection: {
      order: ['queryString', 'cookie'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: true,
      escape: (str) => {
        if (typeof str !== 'string') return str;
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/`/g, '&#x60;');
        // Intentionally skipping apostrophe (')
      },
    },
  });

export default i18n;

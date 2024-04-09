import i18n from 'i18next'
import detector from "i18next-browser-languagedetector";
import { initReactI18next  } from 'react-i18next';

import translationEN from '/public/locales/en/translation.json'
import translationES from '/public/locales/es/translation.json'


i18n.use(detector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: translationEN
        },
        es: {
          translation: translationES
        },
      },
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false // react already safes from xss
      }
    })

export default i18n
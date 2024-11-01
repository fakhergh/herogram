import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import ar from "./locales/ar.json";
import en from "./locales/en.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: "lng",
      caches: ["localStorage"],
    },
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    load: "currentOnly",
    lowerCaseLng: true,
    preload: ["en", "ar"],
    resources: { en, ar },
    debug: false, //process.env.NODE_ENV === 'development',
  })
  .catch(console.error);

export default i18n;

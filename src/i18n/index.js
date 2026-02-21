import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonEn from "./locales/common/en.json";
import commonAm from "./locales/common/am.json";
import homeEn from "./locales/home/en.json";
import homeAm from "./locales/home/am.json";
import historyEn from "./locales/history/en.json";
import historyAm from "./locales/history/am.json";
import teachingsEn from "./locales/teachings/en.json";
import teachingsAm from "./locales/teachings/am.json";
import videosEn from "./locales/videos/en.json";
import videosAm from "./locales/videos/am.json";
import holyEn from "./locales/holy/en.json";
import holyAm from "./locales/holy/am.json";
import notFoundEn from "./locales/notFound/en.json";
import notFoundAm from "./locales/notFound/am.json";
import eventsEn from "./locales/events/en.json";
import eventsAm from "./locales/events/am.json";

const defaultLocale = "am";
const storedLocale = localStorage.getItem("locale");
const activeLocale = storedLocale || defaultLocale;

const translations = {
  en: {
    translation: {
      ...commonEn,
      ...homeEn,
      ...historyEn,
      ...teachingsEn,
      ...videosEn,
      ...holyEn,
      ...notFoundEn,
      ...eventsEn
    }
  },
  am: {
    translation: {
      ...commonAm,
      ...homeAm,
      ...historyAm,
      ...teachingsAm,
      ...videosAm,
      ...holyAm,
      ...notFoundAm,
      ...eventsAm
    }
  }
};

i18n.use(initReactI18next).init({
  resources: translations,
  lng: activeLocale,
  fallbackLng: defaultLocale,
  interpolation: {
    escapeValue: false
  },
  returnNull: false,
  returnEmptyString: false,
  parseMissingKeyHandler: () => "Demo"
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("locale", lng);
});

export default i18n;

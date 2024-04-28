import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./data/lang.json"

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en", // language to use
        fallbackLng: 'en', // use en if detected lng is not available

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
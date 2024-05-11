import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uk from "./data/languages/uk.json"
import en from "./data/languages/en.json"

const resources = {}
Object.assign(resources, uk, en)

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
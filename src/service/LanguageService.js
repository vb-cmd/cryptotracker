import i18n from "../i18n";

const NAME_KEY = 'language'

export default class LanguageService {
    static set name(value) {
        i18n.changeLanguage(value)
        localStorage.setItem(NAME_KEY, value)
    }

    static get name() {
        const language = localStorage.getItem(NAME_KEY)
        return language || i18n.language;
    }

    static setup() {
        i18n.changeLanguage(this.name)
    }
}

LanguageService.setup()
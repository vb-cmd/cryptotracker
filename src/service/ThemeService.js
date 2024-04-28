const NAME_KEY = 'theme'
const NAME_LIGHT = 'light'
const NAME_DARK = 'dark'

const NAME_ATTRIBUTE = 'data-bs-theme'

export default class ThemeService {
    static dark() {
        this.#setTheme(NAME_DARK)
    }

    static light() {
        this.#setTheme(NAME_LIGHT)
    }

    static get currentName() {
        return localStorage.getItem(NAME_KEY);
    }

    static setup() {
        this.#setTheme(this.currentName || NAME_LIGHT)
    }

    static get isDefault() {
        return this.currentName === NAME_LIGHT
    }

    static #setTheme(name) {
        document.documentElement.setAttribute(NAME_ATTRIBUTE, name);
        localStorage.setItem(NAME_KEY, name);
    }
}

ThemeService.setup()
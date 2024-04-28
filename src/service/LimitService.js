const LIMIT_DEFAULT = 50

export default class LimitService {
    static set current(value) {
        localStorage.setItem('limit', value)
    }

    static get current() {
        const value = localStorage.getItem('limit')

        return parseInt(value) || LIMIT_DEFAULT
    }

    static setup() {
        this.current = this.current
    }
}

LimitService.setup()
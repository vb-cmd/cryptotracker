export default class RateService {
    static set current(value) {
        localStorage.setItem(NAME_KEY, value)
    }

    static get current() {
        return localStorage.getItem(NAME_KEY) || RATE_DEFAULT
    }

    static setup() {
        this.current = this.current || RATE_DEFAULT
    }

    /**
     * @returns {Promise<Array<Rate>>}
     */
    static async getAll() {
        const response = await fetchRates()

        if (response.ok) {
            const json = await response.json();

            return json.data.map(Rate.fromJson)
        } else {
            throw Error('Something went wrong')
        }
    }

    /**
     * @param {string} id
     * @returns {Promise<Rate>} 
     */
    static async getSingle(id) {
        const response = await fetchRates(id)

        if (response.ok) {
            const json = await response.json();

            return Rate.fromJson(json.data)
        } else {
            throw Error('Something went wrong or the item doesn\'t exist')
        }
    }
}

const NAME_KEY = 'rate'
const RATE_DEFAULT = 'united-states-dollar'
const URL_MAIN = 'https://api.coincap.io'
const URL_VERSION = 'v2'
const URL_RATES = 'rates'


async function fetchRates(id = '') {
    const url = new URL(`${URL_MAIN}/${URL_VERSION}/${URL_RATES}${id && `/${id}`}`)

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Accept-Encoding': 'gzip'
        },
    })
}

class Rate {
    constructor(id, symbol, currencySymbol, type, priceUsd) {
        this.id = id
        this.shortName = symbol
        this.symbol = currencySymbol
        this.type = type
        this.price = priceUsd
    }

    get fullName() {
        return this.id.replaceAll('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    static fromJson(data) {
        const rate = new Rate(
            data.id,
            data.symbol,
            data.currencySymbol,
            data.type,
            data.rateUsd
        )
        return rate
    }
}
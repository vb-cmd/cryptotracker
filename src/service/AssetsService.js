export default class AssetsService {
    static get totalItems() {
        return 2200
    }

    /**
     * @param {number} offset
     * @param {number} limit
     * @param {string} search
     * @param {Array<string>} ids
     * @returns {Promise<Array<Asset>>}
     */
    static async getAll(offset = 0, limit = 50, search = null, ids = null) {
        const idsString = ids && ids.join(',')
        
        const response = await fetchAssets(search, idsString, limit, offset)
        
        if (response.ok) {
            const json = await response.json();

            return json.data.map(Asset.fromJson)
        } else {
            throw Error("Something went wrong")
        }
    }

    /**
     * @param {string} id
     * @returns {Promise<Asset>}
     */
    static async getSingle(id) {
        const response = await fetchAsset(id)

        if (response.ok) {
            const json = await response.json();

            return Asset.fromJson(json.data)
        } else {
            throw Error("Something went wrong or the item doesn't exist")
        }
    }

    /**
     * @param {string} id
     * @param {("m1" | "m5" | "m15" | "m30" | "h1" | "h2" | "h6" | "h12" | "d1")} interval
     * @param {number} start
     * @param {number} end
     * @returns {Promise<Array<AssetHistory>>}
    */
    static async getHistory(id, interval = INTERVAL_DEFAULT, start = null, end = null) {
        if (!INTERVAL_PARAMS.includes(interval)) {
            throw Error('Interval is not valid')
        }

        const response = await fetchHistory(id, interval, start, end)

        if (response.ok) {
            const json = await response.json();

            return json.data.map((data) => AssetHistory.fromJson(data))
        } else {
            throw Error("Something went wrong or the item doesn't exist")
        }
    }

    /**
     * @param {string} id
     * @returns {WebSocket}
     */
    static createConnection(ids = null) {
        const idsStr = ids ? ids.join(',') : 'ALL'
        return new WebSocket(`wss://ws.coincap.io/prices?assets=${idsStr}`)
    }
}

const INTERVAL_PARAMS = ["m1", "m5", "m15", "m30", "h1", "h2", "h6", "h12", "d1"]
const INTERVAL_DEFAULT = INTERVAL_PARAMS[INTERVAL_PARAMS.length - 1]
const URL_MAIN = 'https://api.coincap.io'
const URL_VERSION = 'v2'
const URL_ASSETS = 'assets'
const URL_HISTORY = 'history'

async function fetchAsset(id) {
    const url = new URL(`${URL_MAIN}/${URL_VERSION}/${URL_ASSETS}/${id}`)

    return await fetchMethod(url)
}

async function fetchAssets(search, ids, limit, offset) {
    const url = new URL(`${URL_MAIN}/${URL_VERSION}/${URL_ASSETS}`)

    if (search) url.searchParams.append('search', search)
    if (ids) url.searchParams.append('ids', ids)
    if (limit) url.searchParams.append('limit', limit)
    if (offset) url.searchParams.append('offset', offset)

    return await fetchMethod(url)
}

async function fetchHistory(id, interval, start, end) {
    const url = new URL(`${URL_MAIN}/${URL_VERSION}/${URL_ASSETS}/${id}/${URL_HISTORY}`)

    if (interval) url.searchParams.append('interval', interval)
    if (start && end) {
        url.searchParams.append('start', start)
        url.searchParams.append('end', end)
    }

    return await fetchMethod(url)
}

async function fetchMethod(url) {
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Accept-Encoding': 'gzip'
        },
    })
}

class Asset {
    constructor(id, rank, symbol, name, supply, maxSupply, marketCap, volume24h, price, changePercent24h, averagePrice24h) {
        this.id = id
        this.rank = rank
        this.symbol = symbol
        this.name = name
        this.supply = supply
        this.maxSupply = maxSupply
        this.marketCap = marketCap
        this.volume24h = volume24h
        this.price = price
        this.changePercent24h = changePercent24h
        this.averagePrice24h = averagePrice24h
    }

    static fromJson(data) {
        const asset = new Asset(
            data.id,
            data.rank,
            data.symbol,
            data.name,
            data.supply,
            data.maxSupply,
            data.marketCapUsd,
            data.volumeUsd24Hr,
            data.priceUsd,
            data.changePercent24Hr,
            data.vwap24Hr)
        return asset
    }

    get image() {
        return `https://assets.coincap.io/assets/icons/${this.symbol.toLowerCase()}@2x.png`
    }
}

class AssetHistory {
    constructor(price, date) {
        this.price = price
        this.date = date
    }

    static fromJson(data) {
        const asset = new AssetHistory(
            data.priceUsd,
            data.date
        )
        return asset
    }
}
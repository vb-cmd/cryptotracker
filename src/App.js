import './i18n';
import {
  useEffect,
  useState
} from 'react';

import RateService from './service/RateService';
import AssetsService from "./service/AssetsService";
import LimitService from './service/LimitService';

import { humanReadable } from './helper/stringHelper';

import { RateContext } from './contexts/RateContext';

import Footer from './layout/Footer';
import Header from './layout/Header';

import ScrollNavigation from './components/ScrollNavigation';
import ShowMore from './components/ShowMore';
import AssetsTable from './components/AssetsTable';
import { Loading } from './components/Loading';
import { ErrorMessage } from './components/ErrorMessage';


export default function App() {
  const [rates, setRates] = useState([]);
  const [rate, setRate] = useState([]);
  const [assets, setAssets] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    RateService.getAll()
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        })

        setRates(sortedData)
        setRate(sortedData.find((value) => value.id === RateService.current))
      })
  }, [setRates, setRate])

  const fetchData = async (start, limitItems, searchQuery = null, ids = null) => {
    setIsLoading(true)

    await AssetsService.getAll(start, limitItems, searchQuery, ids)
      .then((data) => setAssets((array) => [...array, ...data]))
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setOffset(value => value + LimitService.current)

    fetchData(offset, LimitService.current)
  }, [setOffset]);


  useEffect(() => {
    const ws = AssetsService.createConnection()

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data)

      for (const [nameCoin, price] of Object.entries(data)) {
        const baseElement = document.getElementById(nameCoin + 'Row')

        if (baseElement) {
          const priceElement = baseElement.querySelector('#price')

          if (!priceElement) continue

          const priceCurrent = parseFloat(priceElement.innerText)
          const priceNew = parseFloat(price)
          const priceRate = parseFloat(rate.price)

          if (priceCurrent === priceNew) continue

          const colorBg = priceCurrent > priceNew ? '--bs-success-rgb' : '--bs-danger-rgb'

          baseElement.animate(
            [{ backgroundColor: `rgb(var(${colorBg}), 0.5)` }, { backgroundColor: 'var(--bs-table-bg)' }],
            { duration: 500, fill: 'forwards' })

          priceElement.innerText = `${humanReadable(priceNew / priceRate)}`
        }
      }
    }
    return () => ws.close()
  }, [rate])

  const handleFetchMore = async () => {
    setOffset(value => value + LimitService.current)

    await fetchData(offset, LimitService.current);
  }

  return (
    <RateContext.Provider value={{ rates, rate, setRate }}>
      <ScrollNavigation />
      <Header />

      <div className='middle-1400'>
        {isLoading && <Loading />}
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {assets && <AssetsTable assets={assets} />}

        <ShowMore handleFetch={handleFetchMore} />
      </div>

      <Footer />
    </RateContext.Provider>
  );
}


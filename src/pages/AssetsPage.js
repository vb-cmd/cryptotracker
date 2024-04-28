import ShowMore from '../components/ShowMore';
import AssetsTable from '../components/AssetsTable';
import AssetsService from "../service/AssetsService";
import { Loading } from '../components/Loading';
import { useEffect, useState, useContext } from "react";
import LimitService from '../service/LimitService';
import { humanReadable } from '../helper/stringHelper';
import { ErrorMessage } from '../components/ErrorMessage';
import { RateContext } from '../App';
import { Helmet } from 'react-helmet';

export default function AssetsPage() {
  const { rate } = useContext(RateContext);
  const [assets, setAssets] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = async (offset, searchQuery = null, ids = null) => {
    setIsLoading(true)

    await AssetsService.getAll(offset, LimitService.current, searchQuery, ids)
      .then((data) => setAssets((array) => [...array, ...data]))
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    document.title = `Coins - Crypto Tracker`
    setOffset(value => value + LimitService.current)

    fetchData(offset)
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

    await fetchData(offset);
  }

  return (
    <>
      <Helmet><title>Crypto Tracker</title></Helmet>
      <div className="assets-page">
        <div className='middle-1400'>
          {isLoading && <Loading />}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
        {assets && <AssetsTable assets={assets} />}
        <ShowMore handleFetch={handleFetchMore} />
      </div>
    </>
  );
}


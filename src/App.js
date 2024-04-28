import { Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import AssetsPage from './pages/AssetsPage';
import AssetPage from './pages/AssetPage';
import ScrollNavigation from './components/ScrollNavigation';
import './scss/app.scss';
import './i18n';
import { createContext, useEffect, useState } from 'react';
import RateService from './service/RateService';

export const RateContext = createContext(null);

export default function App() {
  const [rates, setRates] = useState([]);
  const [rate, setRate] = useState([]);

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

  return (
    <div className="app">
      <RateContext.Provider value={{ rates, rate, setRate }}>
        <ScrollNavigation />
        <Header />

        <Routes>
          <Route exact path="/" element={<AssetsPage />}></Route>
          <Route path="/assets">
            <Route path=':coinId' element={<AssetPage />}></Route>
          </Route>
        </Routes>

        <Footer />
      </RateContext.Provider>
    </div >
  );
}


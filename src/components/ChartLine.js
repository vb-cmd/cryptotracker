import { useEffect, useState, useRef, useContext } from 'react';
import AssetsService from '../service/AssetsService';
import { Nav, Card } from 'react-bootstrap';
import { Chart } from 'chart.js/auto';
import { ErrorMessage } from './ErrorMessage';
import { Loading } from './Loading';
import '../scss/components/chart-line.scss';
import { useTranslation } from 'react-i18next';
import { RateContext } from '../contexts/RateContext';

export function ChartLine({ asset }) {
    const { rate } = useContext(RateContext);
    const chartRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [assetHistory, setAssetHistory] = useState([]);

    const fetchHistory = async (id, interval = "d1", start = null, end = null) => {
        setIsLoading(true);
        
        await AssetsService.getHistory(id, interval, start, end)
            .then((data) => setAssetHistory(data))
            .catch((error) => setErrorMessage(error.message))
            .finally(() => setIsLoading(false));
    };


    useEffect(() => {
        fetchHistory(asset.id);
    }, [asset]);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const barChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: assetHistory.map(item => new Date(item.date).toLocaleString()),
                datasets: [{
                    label: asset.name,
                    data: assetHistory.map(item => (item.price / rate.price)),
                    fill: true,
                    borderColor: '#198754',
                    tension: 1,
                    pointHoverBackgroundColor: '#198754',
                    pointHoverBorderColor: '#198754',
                }],
            },

        });

        barChart.draw();

        return () => barChart.destroy();
    }, [chartRef, assetHistory, rate, asset]);

    const handleFetchData = async (interval, start, end) => {
        await fetchHistory(asset.id, interval, start, end);
    };

    return (
        <div className='chart-line'>
            <Card body className='m-2'>
                <NavigationDate handleFetchData={handleFetchData} />
                {isLoading && <Loading />}
                {errorMessage && <ErrorMessage message={errorMessage} />}
                {assetHistory && <canvas ref={chartRef} height="100%" width="100%"></canvas>}
            </Card>
        </div>
    );
}

function NavigationDate({ handleFetchData }) {
    const { t } = useTranslation();

    const intervalKeys = ['day', 'week', 'month', '3months', '6months', 'year'];
    const defaultKey = intervalKeys[intervalKeys.length - 1];

    const selectedInterval = (key) => {
        const dayToMs = () => 1000 * 60 * 60 * 24;
        switch (key) {
            case 'day':
                return { timestamp: dayToMs(), interval: "m15" };
            case 'week':
                return { timestamp: dayToMs() * 7, interval: "h1" };
            case 'month':
                return { timestamp: dayToMs() * 30, interval: "h6" };
            case '3months':
                return { timestamp: dayToMs() * (30 * 3), interval: "h12" };
            case '6months':
                return { timestamp: dayToMs() * (30 * 6), interval: "d1" };
            case 'year':
                return { timestamp: dayToMs() * (30 * 12), interval: "d1" };
            default:
                return { timestamp: 0, interval: "d1" };
        }
    };

    const handleSelectedKey = (key) => {
        const intervalTime = selectedInterval(key);
        const start = Date.now() - intervalTime.timestamp;
        const end = Date.now();

        handleFetchData(intervalTime.interval, start, end);
    }

    return (
        <Nav variant='pills'
            fill
            defaultActiveKey={defaultKey}
            onSelect={handleSelectedKey}
            className='chart-line-nav'>
            {intervalKeys.map((item) => {
                return (
                    <Nav.Item key={item}>
                        <Nav.Link eventKey={item}>{t(`asset.chart.nav.${item}`)}</Nav.Link>
                    </Nav.Item>
                );
            })}
        </Nav>
    )
}
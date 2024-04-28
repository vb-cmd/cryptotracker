import { useEffect, useState } from 'react'
import AssetsService from '../service/AssetsService';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loading } from '../components/Loading';
import { AssetCard } from '../components/AssetCard';
import { ChartLine } from '../components/ChartLine';
import { Helmet } from 'react-helmet';

export default function AssetPage() {
    const [asset, setAsset] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { coinId } = useParams()

    useEffect(() => {
        setIsLoading(true)

        AssetsService.getSingle(coinId)
            .then(data => setAsset(data))
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false))
    }, [setAsset, setIsLoading, coinId])

    return (
        <>
            {asset && <Helmet><title>{asset.name} - Crypto Tracker</title></Helmet>}
            <div className='asset-page middle-1400'>
                <div className='m-2'>
                    {isLoading && <Loading />}
                    {error && <ErrorMessage message={error} />}
                    {asset && <AssetCard asset={asset} />}
                    {asset && <ChartLine asset={asset} />}
                </div>
            </div>
        </>
    )
}

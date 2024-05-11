import { ListGroup, Badge, Card, Stack, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { humanReadable } from "../helper/stringHelper";
import { useContext } from 'react';
import { RateContext } from '../contexts/RateContext';
import XCircle from '../img/x-circle.svg'

export function AssetCard({ asset }) {
    const { rate } = useContext(RateContext);
    const { t } = useTranslation();
    const changeBackgroundColor = (value) => value > 0 ? 'success' : 'danger'
    const divideRate = (value) => humanReadable(value / rate.price)

    return (
        <Card className='m-2'>
            <Card.Header>
                <Stack direction="horizontal" gap={2}>
                    <Image src={asset.image} width="70" thumbnail onError={(e) => { e.target.onerror = null; e.target.src = XCircle }} />
                    <Stack direction='vertical' className='p-2'>
                        <h1 className='text-uppercase text-center'>{asset.name} ({asset.symbol})</h1>
                        <Badge bg="success">{t('asset.card.rank')} {asset.rank}</Badge>
                    </Stack>
                </Stack>
            </Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>{t('asset.card.supply')} <Badge bg='secondary'>{humanReadable(asset.supply)}</Badge></ListGroup.Item>
                <ListGroup.Item>{t('asset.card.total-supply')} <Badge bg='secondary'>{humanReadable(asset.maxSupply)}</Badge></ListGroup.Item>
                <ListGroup.Item>{t('asset.card.market')} <Badge bg='secondary'>{rate.symbol}{divideRate(asset.marketCap)}</Badge></ListGroup.Item>
                <ListGroup.Item>{t('asset.card.volume24')} <Badge bg='secondary'>{rate.symbol}{divideRate(asset.volume24h)}</Badge></ListGroup.Item>
                <ListGroup.Item>{t('asset.card.price')} <Badge bg='secondary'>{rate.symbol}{divideRate(asset.price)}</Badge></ListGroup.Item>
                <ListGroup.Item>{t('asset.card.change24')} <Badge bg={changeBackgroundColor(asset.changePercent24h)}>{humanReadable(asset.changePercent24h)}</Badge></ListGroup.Item>
                <ListGroup.Item>{t('asset.card.average24')} <Badge bg='secondary'>{rate.symbol}{divideRate(asset.averagePrice24h)}</Badge></ListGroup.Item>
            </ListGroup>
        </Card>
    );
}

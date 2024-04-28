import { Button, Image, Stack, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { humanReadable } from "../helper/stringHelper";
import { RateContext } from '../App';
import { useContext } from 'react';
import '../scss/components/assets-table.scss';

export default function AssetsTable({ assets }) {
    const { t } = useTranslation();

    return (
        <div className="assets-table">
            <Table bordered hover responsive striped className='middle-1400 mt-3 mb-3'>
                <thead>
                    <tr>
                        <th>{t('assets.table.header.rank')}</th>
                        <th>{t('assets.table.header.name')}</th>
                        <th>{t('assets.table.header.price')}</th>
                        <th>{t('assets.table.header.market')}</th>
                        <th>{t('assets.table.header.change24')}</th>
                        <th>{t('assets.table.header.volume24')}</th>
                        <th>{t('assets.table.header.average24')}</th>
                        <th>{t('assets.table.header.total-supply')}</th>
                        <th>{t('assets.table.header.supply')}</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => <AssetsTableRow asset={asset} key={asset.id} />)}
                </tbody>
            </Table>
        </div>
    )
}

function AssetsTableRow({ asset }) {
    const { rate } = useContext(RateContext);
    const divideRate = (value) => humanReadable(value / rate.price)

    const changeColor = asset.changePercent24h > 0 ? 'text-success' : 'text-danger'
    const href = `assets/${asset.id}`;

    return (
        <tr id={`${asset.id}Row`}>
            <td>{asset.rank}</td>
            <td>
                <Button href={href} variant="secondary">
                    <Stack direction="horizontal" gap={1}>
                        <Image src={asset.image} width="30" thumbnail />
                        {`${asset.name} (${asset.symbol})`}
                    </Stack>
                </Button>
            </td>
            <td>{rate.symbol}<span id={"price"}>{divideRate(asset.price)}</span></td>
            <td>{rate.symbol}{divideRate(asset.marketCap)}</td>
            <td className={changeColor}>{humanReadable(asset.changePercent24h)}%</td>
            <td>{rate.symbol}{divideRate(asset.volume24h)}</td>
            <td>{rate.symbol}{divideRate(asset.averagePrice24h)}</td>
            <td>{humanReadable(asset.maxSupply)}</td>
            <td>{humanReadable(asset.supply)}</td>
        </tr>
    );
}

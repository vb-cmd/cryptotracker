import { AssetCard } from './AssetCard';
import { ChartLine } from './ChartLine';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

export default function DetailedAsset({ asset, children, variant }) {
    const { t } = useTranslation()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant={variant} onClick={handleShow}>
                {children}
            </Button>

            <Modal show={show}
                onHide={handleClose}
                size="xl"
                fullscreen="xl-down">
                <Modal.Header closeButton>
                    <Modal.Title>{t('asset.title')}</Modal.Title>
                </Modal.Header>

                <Modal.Body className='m-2'>
                    {asset && <AssetCard asset={asset} />}
                    {asset && <ChartLine asset={asset} />}
                </Modal.Body>
            </Modal>
        </>
    )
}

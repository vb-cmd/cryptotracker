import { Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import '../scss/components/show-more.scss';
import { useTranslation } from 'react-i18next';

export default function ShowMore({ handleFetch }) {
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const handleClick = async () => {
        setIsLoading(true)

        await handleFetch()

        setIsLoading(false)
    }

    return (
        <div className='show-more'>
            <Button variant="secondary" onClick={handleClick} disabled={isLoading}>
                {isLoading ? <><Spinner animation="grow" size='sm' />{t('assets.more.loading')}</> : t('assets.more.show')}
            </Button>
        </div>
    )
}
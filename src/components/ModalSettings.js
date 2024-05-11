import {
    Form,
    Offcanvas,
    Stack,
    InputGroup
} from 'react-bootstrap';
import ThemeService from '../service/ThemeService';
import { useTranslation } from 'react-i18next';
import LanguageService from '../service/LanguageService';
import LimitService from '../service/LimitService';
import RateService from '../service/RateService';
import {
    useContext,
    useEffect,
    useState
} from 'react';
import { RateContext } from '../contexts/RateContext';

export default function ModalSettings({ show, handleClose }) {
    const limitList = [10, 20, 50, 100]
    const [t, i18n] = useTranslation();
    const rateContext = useContext(RateContext);
    const [cryptoList, setCryptoList] = useState([]);
    const [fiatList, setFiatList] = useState([]);

    useEffect(() => {
        setCryptoList(rateContext.rates.filter((value) => value.type === 'crypto'))
        setFiatList(rateContext.rates.filter((value) => value.type === 'fiat'))
    }, [setCryptoList, setFiatList, rateContext])

    const handleChangeTheme = (element) => {
        element.target.checked ? ThemeService.dark() : ThemeService.light();
    };

    const handleChangeLanguage = (element) => {
        const value = element.target.value
        LanguageService.name = value
    }

    const handleChangeLimit = (event) => {
        const value = parseInt(event.target.value)
        LimitService.current = value
    }

    const handleChangeRate = (event) => {
        const id = event.target.value
        RateService.current = id
        rateContext.setRate(rateContext.rates.find((value) => value.id === id))
    }

    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{t('settings.title')}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    <Form.Check
                        type="switch"
                        onChange={handleChangeTheme}
                        label={t('settings.theme.title')}
                        defaultChecked={!ThemeService.isDefault}
                    />
                    <InputGroup className='flex-nowrap'>
                        <InputGroup.Text>{t('settings.language.title')}</InputGroup.Text>
                        <Form.Select
                            defaultValue={i18n.language}
                            onChange={handleChangeLanguage}>
                            {Object.keys(i18n.options.resources).map((value) => <option key={value} value={value}> {t('settings.language.name', { lng: value })}</option>)}
                        </Form.Select>
                    </InputGroup>

                    <InputGroup className='flex-nowrap'>
                        <InputGroup.Text>{t('settings.limit.title')}</InputGroup.Text>
                        <Form.Select
                            defaultValue={LimitService.current}
                            onChange={handleChangeLimit}>
                            {limitList.map((value) => <option key={value} value={value}>{value}</option>)}
                        </Form.Select>
                    </InputGroup>

                    <InputGroup className='flex-nowrap'>
                        <InputGroup.Text>{t('settings.currency.title')}</InputGroup.Text>
                        <Form.Select value={rateContext.rate.id} onChange={handleChangeRate}>
                            <optgroup label={t('settings.currency.group.crypto')}>
                                {cryptoList.map((value) => <option key={value.id} value={value.id}>{value.fullName} ({value.shortName})</option>)}
                            </optgroup>
                            <optgroup label={t('settings.currency.group.fiat')}>
                                {fiatList.map((value) => <option key={value.id} value={value.id}>{value.fullName} ({value.shortName})</option>)}
                            </optgroup>
                        </Form.Select>
                    </InputGroup>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
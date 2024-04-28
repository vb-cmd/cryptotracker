import '../scss/layout/footer.scss';
import { Col, Row, Container, Stack } from 'react-bootstrap';
import SocialLinks from '../components/SocialLinks';
import WalletButtonGroup from '../components/WalletButtonGroup';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    return (
        <div className="footer p-3">
            <Container fluid className='middle-1400'>
                <Row>
                    <Col>
                        <Stack direction="vertical" gap={2}>
                            <h3>{t('footer.support')}</h3>
                            <WalletButtonGroup />
                        </Stack>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>{t('footer.logo.name')}</h3>
                        <p>{t('footer.logo.description')}</p>
                        <p>{t('footer.version')} {'1.0.1'} | © {new Date(Date.now()).getFullYear()}</p>
                    </Col>
                    <Col>
                        <h3>{t('footer.follow')}</h3>
                        <SocialLinks />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


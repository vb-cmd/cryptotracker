import { Navbar, Container, Nav, Button, Stack } from 'react-bootstrap';
import { useState } from 'react';
import '../scss/layout/header.scss';
import ModalSettings from '../components/ModalSettings';
import Boxicon from '../components/Boxicon';
import { useTranslation } from 'react-i18next';
import { ModalSearch } from '../components/ModalSearch';

function Header() {
    const [showSettings, setShowSettings] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const { t } = useTranslation();

    const handleOpenSearch = () => setShowSearch(true);
    const handleCloseSearch = () => setShowSearch(false);

    const handleOpenSettings = () => setShowSettings(true);
    const handleCloseSettings = () => setShowSettings(false);

    return (
        <div className='header'>
            <Navbar expand="sm" className="bg-body-tertiary middle-1400">
                <Container fluid>
                    <Navbar.Brand>{t('header.logo.name')}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">{t('header.links.home')}</Nav.Link>
                        </Nav>

                        <Stack direction="horizontal" gap={2}>
                            <Button variant="success" onClick={handleOpenSearch}>
                                <Boxicon size="sm" name="search" type='regular' />
                            </Button>
                            <Button variant="outline-success" onClick={handleOpenSettings}>
                                <Boxicon size="sm" name="cog" type='solid' />
                            </Button>
                        </Stack>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <ModalSettings show={showSettings} handleClose={handleCloseSettings} />
            <ModalSearch show={showSearch} handleClose={handleCloseSearch} />
        </div>
    );
}

export default Header;




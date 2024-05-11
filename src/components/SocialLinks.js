import { Button, Stack } from "react-bootstrap";
import Boxicon from './Boxicon';
import '../scss/components/social-links.scss';

export default function SocialLinks() {
    return (
        <Stack direction="horizontal" gap={2} className="social-links">
            <Button className="social-links-email"><Boxicon size="md" name="envelope" type='solid' /></Button>
            <Button className="social-links-github"><Boxicon size="md" name="github" type='logo' /></Button>
            <Button className="social-links-telegram"><Boxicon size="md" name="telegram" type='logo' /></Button>
            <Button className="social-links-twitter"><Boxicon size="md" name="twitter" type='logo' /></Button>
        </Stack>
    )
}
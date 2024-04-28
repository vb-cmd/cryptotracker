import { Button, Stack } from "react-bootstrap";
import Boxicon from './Boxicon';
import '../scss/components/social-links.scss';

export default function SocialLinks() {
    return (
        <Stack direction="horizontal" gap={2} className="social-links">
            <Button className="social-links__email"><Boxicon size="md" name="envelope" type='solid' /></Button>
            <Button className="social-links__github"><Boxicon size="md" name="github" type='logo' /></Button>
            <Button className="social-links__telegram"><Boxicon size="md" name="telegram" type='logo' /></Button>
            <Button className="social-links__twitter"><Boxicon size="md" name="twitter" type='logo' /></Button>
        </Stack>
    )
}
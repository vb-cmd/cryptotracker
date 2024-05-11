import { Button, Stack } from "react-bootstrap";
import '../scss/components/scroll-navigation.scss';
import Boxicon from "./Boxicon";


export default function ScrollNavigation() {
    const scrollSwitcher = (toggle) => {
        const top = toggle ? 0 : document.body.scrollHeight
        window.scrollTo({ top: top, behavior: 'smooth' });
    }

    const buttons = [
        { toggle: true, vertical: 'top' },
        { toggle: false, vertical: 'bottom' }
    ];

    return (
        <div className="scroll-navigation">
            <Stack direction="vertical" gap={2} className="scroll-navigation-buttons">
                {buttons.map((item) => {
                    return (
                        <Button
                            key={item.vertical}
                            variant="success"
                            onClick={() => scrollSwitcher(item.toggle)}>
                            <Boxicon
                                size="sm"
                                name={`vertical-${item.vertical}`}
                                type='regular' />
                        </Button>
                    )
                })}
            </Stack>
        </div>
    )
}

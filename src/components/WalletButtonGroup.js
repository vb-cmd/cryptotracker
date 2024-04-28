import { InputGroup, Form } from 'react-bootstrap';
import { useRef } from 'react';
import wallets from '../data/wallets.json';

export default function WalletButtonGroup() {
    const inputWalletRef = useRef(null);

    const handleChange = async (event) => {
        const value = event.target.value;
        inputWalletRef.current.value = value;

        try {
            await navigator.clipboard.writeText(inputWalletRef.current.value);
        } catch {
            inputWalletRef.current.focus();
        } finally {
            inputWalletRef.current.select();
        }
    };

    return (
        <InputGroup className="mb-3" size='lg'>
            <Form.Select variant="secondary"
                onChange={handleChange}
                defaultValue={wallets[0].name}
                style={{ maxWidth: '150px', minWidth: '100px' }}>
                {wallets.map((wallet) => <option key={wallet.name} value={wallet.hash}>{wallet.name}</option>)}
            </Form.Select>
            <Form.Control ref={inputWalletRef} value={wallets[0].hash} readOnly />
        </InputGroup>
    );
}

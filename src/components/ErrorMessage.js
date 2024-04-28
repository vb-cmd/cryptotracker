import { Alert } from 'react-bootstrap';

export function ErrorMessage({ message }) {
    return (
        <Alert variant="danger">
            {message}
        </Alert>
    );
}

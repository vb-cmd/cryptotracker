import { Spinner } from 'react-bootstrap';

export function Loading() {
    return (
        <div className='d-flex p-2 justify-content-center'>
            <Spinner animation="border" variant="primary" />
        </div>
    );
}

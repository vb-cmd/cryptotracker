import { AssetCard } from './AssetCard'
import { Container, Row, Col } from 'react-bootstrap';

export default function ContainerAssets({ assets }) {
    const groups = Math.ceil(assets.length / 3)

    const columnOne = assets.slice(0, groups)
    const columnTwo = assets.slice(groups, groups * 2)
    const columnThree = assets.slice(groups * 2, groups * 3)

    return (
        <Container>
            <Row>
                <Col>
                    {columnOne.map((asset) => (
                        <AssetCard asset={asset} />
                    ))}
                </Col>
                <Col>
                    {columnTwo.map((asset) => (
                        <AssetCard asset={asset} />
                    ))}
                </Col>
                <Col>
                    {columnThree.map((asset) => (
                        <AssetCard asset={asset} />
                    ))}
                </Col>
            </Row>
        </Container>
    )
}
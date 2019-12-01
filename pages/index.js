import React from 'react'
import Head from 'next/head'
import {Container, Row, Col} from 'reactstrap'
import Categories from '../components/layouts/categories'
const IndexPage = () => (
    <div>
        <Head>
            <title>Home</title>
        </Head>
        <Container>
            <Row>
                <Col sm="12" md="3">
                    <Categories />
                </Col>
                <Col sm="12" md="9">
                    B
                </Col>
            </Row>
        </Container>
    </div>
)
export default IndexPage
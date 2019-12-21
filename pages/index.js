import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import {Container, Row, Col} from 'reactstrap'
import Categories from '../components/layouts/categories'
import HomeSlider from '../components/home-slider'
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
                    <HomeSlider
                        autoplay={true}
                        dots={true}
                        timer={5000}
                    />
                </Col>
            </Row>
        </Container>
    </div>
);
HomeSlider.propTypes = {
    autoplay: PropTypes.bool,
    dots: PropTypes.bool,
    timer: PropTypes.number,
}
export default IndexPage
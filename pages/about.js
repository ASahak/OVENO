import React from 'react'
import Head from "next/head";
import {Col, Container, Row} from "reactstrap";

const About = (() => {
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>
            <Container>
                <Row>
                    <Col sm="12" md="6">
                        <div className="about-left-wrap" style={{backgroundImage: 'url(' + require("../assets/images/Thailand-Shop-Online-Banner-2.gif") + ')'}}>
                        </div>
                    </Col>
                    <Col sm="12" md="6">
                        <h2>About Us</h2>
                        <p>
                            You know when you first meet someone and they say “tell me about yourself” and you freeze not knowing where to start, then slowly try to back out of the conversation? (Or maybe that’s just me...)

                        </p>
                        <p>Well, that’s what the “About Us” page has become for many businesses. They’re either boring, droning on and on without direction, or simply, don’t exist at all.</p>

                        <p>Unless you’re Google or Apple, not having an “About Us” is a huge misstep. Not only is this page one of the most highly viewed on most sites, but it offers an opportunity to introduce yourself and, most importantly, build trust.</p>

                        <p>Armed with some research and a few years of agency life under my belt, here are a few quick tips I’ve put together on how you can write an “About Us” page that actually seals the deal.</p>
                    </Col>
                </Row>
            </Container>
            <style jsx={true}>{`
                @media screen and (max-width: 767px) {
                    .about-left-wrap {
                        height: 400px;
                        margin-bottom: 20px;
                    }
                }
            `}</style>
        </div>
    )
});
export default About

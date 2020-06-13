import React from 'react'
import classesFooter from './footer.scss';
import {Container, Row, Col} from 'reactstrap'
import classesMiddleWrap from "../header/elements/middleWrap.scss";

export default class IndexHeader extends React.Component {
    constructor (props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <footer className={classesFooter.footer_ovo}>
                <Container>
                    <Row>
                        <Col sm="12" md="4" className={classesFooter.footer_left}>
                            <h4>About Us</h4>
                            <p>This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis</p>
                        </Col>
                        <Col sm="12" md="4" className={classesFooter.footer_middle}>
                            <h4>NEWSLETTER</h4>
                            <div className={classesFooter['news-letter']}>
                                <input type="text" placeholder="Your email here"/>
                                <button>Subscribe</button>
                            </div>
                        </Col>
                        <Col sm="12" md="4" className={classesFooter.footer_right}>
                            <h4>CONNECT WITH US</h4>
                            <a href="">
                                <i className="fa fa-facebook"></i>
                            </a>
                            <a href="">
                                <i className="fa fa-linkedin"></i>
                            </a>
                            <a href="">
                                <i className="fa fa-github"></i>
                            </a>
                            <p>
                                <span className="lnr lnr-phone"></span>
                                + 123.456 789 999
                            </p>
                            <p>
                                <span className="lnr lnr-envelope"></span>
                                Support@vinawebsolutions.com
                            </p>
                        </Col>
                    </Row>
                </Container>
                <div className={classesFooter.footer_bottom}>
                    <Container>
                        <p>Copyright © 2020 Oveno. All Rights Reserved.</p>
                        <p>Design and Development by <a href="">Arthur Sahakyan</a></p>
                    </Container>
                </div>
            </footer>
        )
    }
}

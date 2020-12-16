import React from 'react'
import classesFooter from './footer.scss';
import {Container, Row, Col} from 'reactstrap'
import UI_ELEMENTS from "components/shared/UI";
import axios from "lib/axiosEnv";
import {toast} from "react-toastify";
import * as constants from 'utils';

export default class IndexHeader extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.emailRef = React.createRef();
    }

    async onSubmit (dataForm) {
        dataForm.preventDefault();
        try {
            if(this.emailRef && this.emailRef.current) {
                this.setState({
                    loading: true,
                });
                if (this.emailRef.current.value === '') return;
                if (!constants.EMAIL_VALIDATION(this.emailRef.current.value)) throw Error('Please fill right email address!');

                const {data} = await axios.put('/api/subscribeEmail', {email: this.emailRef.current.value});
                if (data.error) throw Error(data.error);
                toast.dark(data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    pauseOnHover: false
                });
            } else throw Error('Input Ref doesn\'t find!')

        } catch (err) {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false
            });
        } finally {
            this.setState({
                loading: false,
            });
            if (this.emailRef.current) this.emailRef.current.value = '';
        }
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
                            <form onSubmit={this.onSubmit} className={classesFooter['news-letter']}>
                                <UI_ELEMENTS.Input
                                    type="text"
                                    refBind={this.emailRef}
                                    fullWidth={true}
                                    placeholder="Your email here"
                                    size="sm" />
                                <UI_ELEMENTS.Button
                                    icon={this.state.loading ? {dir: 'right', element: 'loading'} : {}}
                                    type="submit"
                                    text="Subscribe"
                                    width={120}
                                    margin={['0px', '0', '0', 'auto']}
                                    size="sm"/>
                            </form>
                        </Col>
                        <Col sm="12" md="4" className={classesFooter.footer_right}>
                            <h4>CONNECT WITH US</h4>
                            <a href="https://www.facebook.com/artur.sahakyan.3762" target="_blank">
                                <i className="fa fa-facebook"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/arthur-sahakyan-276abb158/" target="_blank">
                                <i className="fa fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/ASahak" target="_blank">
                                <i className="fa fa-github"></i>
                            </a>
                            <p>
                                <span className="lnr lnr-phone"></span>
                                +374 94129604
                            </p>
                            <p>
                                <span className="lnr lnr-envelope"></span>
                                arthur.sahakyan96@gmail.com
                            </p>
                        </Col>
                    </Row>
                </Container>
                <div className={classesFooter.footer_bottom}>
                    <Container>
                        <p>CopyRight © 2020 Oveno. All Rights Reserved.</p>
                        <p>Design and Development by <a href="https://arthur-portfolio.web.app" target="_blank">Arthur Sahakyan</a></p>
                    </Container>
                </div>
            </footer>
        )
    }
}

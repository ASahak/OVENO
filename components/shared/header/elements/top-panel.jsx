import React from 'react';
import classesTopPanel from './top-panel.scss';
import {Container, Row, Col} from 'reactstrap'
import Link from 'next/link';
import { ModalToggle } from "../../../../utils/common.js";

export default class TopPanel extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            currentLang: {
                flag: require('../../../../assets/images/flag1.png'),
                text: 'English'
            },
            secondLang: {
                flag: require('../../../../assets/images/flag2.png'),
                text: 'Armenian'
            }
        };
        this.changeLang = this.changeLang.bind(this)
    }
    changeLang () {
        this.setState({
            currentLang: this.state.secondLang,
            secondLang: this.state.currentLang
        })
    }
    __showLangModal () {
        return this.refs.langBar && new ModalToggle().showModal(this.refs.langBar, false)
    }
    componentDidMount() {
    }

    render () {
        return (
            <div className={classesTopPanel.tp_panel_container}>
                <Container>
                    <Row>
                        <Col xs="3">
                            <div className={classesTopPanel.lang_bar}>
                                <div className={classesTopPanel.selected_lang_bar} onClick={this.__showLangModal.bind(this)}>
                                    <img src={this.state.currentLang.flag} alt="language" className="img-fluid" />
                                    {this.state.currentLang.text}
                                    <i className="fas fa-angle-down"></i>
                                </div>
                                <ul ref="langBar" type="none" className={classesTopPanel.leftovers_language_bar}>
                                    <li onClick={this.changeLang}>
                                        <img src={this.state.secondLang.flag} alt="language" className="img-fluid" />
                                        {this.state.secondLang.text}
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs="9">
                            <div className={`text-right ${classesTopPanel.right_bar}`}>
                                <ul type="none" className="d-inline-flex align-items-center p-0 m-0">
                                    <li>
                                        <a href="">My Account</a>
                                    </li>
                                    <li>
                                        <Link href="login" prefetch={false}>
                                            <a>Log in</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

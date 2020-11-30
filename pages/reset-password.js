import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {Col, Container, Row} from "reactstrap";
const {
    getToken
} = require('utils/auth');
import {toast} from "react-toastify";
import UI_ELEMENTS from "../components/shared/UI";
import {
    EMAIL_VALIDATOR,
    FULL_NAME_VALIDATOR,
    PASSWORD_VALIDATOR
} from "utils";
const {
    removeCookieByKey
} = require('utils/auth');

import {useForm} from "react-hook-form";
import Router from "next/router";

const ResetPassword = (props) => {
    const { register, handleSubmit, watch, errors, setValue } = useForm({
        mode: 'onBlur',
    });


    const onSubmit = async (dataForm) => {
    };
    // const password = useRef({});
    // password.current = watch("password", "");
    return (
        <Container>
            <Row>
                <Col sm={{size:12}} md={{size:10, offset: 1}} lg={{size:8, offset: 2}}>
                    <div className="contact-main-wrap">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <UI_ELEMENTS.Input
                                type="email"
                                name="email"
                                refBind={register(EMAIL_VALIDATOR)}
                                errors={errors.email && errors.email.message}
                                fullWidth={true}
                                placeholder="Email ID"
                                size="md" />
                            {/*<UI_ELEMENTS.Input*/}
                            {/*    refBind={register(PASSWORD_VALIDATOR)}*/}
                            {/*    errors={*/}
                            {/*        errors.password && errors.password.message ||*/}
                            {/*        errors.password && errors.password.type === 'containsDigit' && 'Use 1 ore more numbers' ||*/}
                            {/*        errors.password && errors.password.type === 'containsUppercase' && 'Use upper and lower case characters'*/}
                            {/*    }*/}
                            {/*    name="password"*/}
                            {/*    type="password"*/}
                            {/*    fullWidth={true}*/}
                            {/*    placeholder="New Password"*/}
                            {/*    size="md" />*/}
                            {/*<UI_ELEMENTS.Input*/}
                            {/*    refBind ={register({*/}
                            {/*        validate: value =>*/}
                            {/*            value === password.current || "The passwords do not match"*/}
                            {/*    })}*/}
                            {/*    errors={errors.password_repeat && errors.password_repeat.message}*/}
                            {/*    name="password_repeat"*/}
                            {/*    type="password"*/}
                            {/*    fullWidth={true}*/}
                            {/*    placeholder="Confirm Password"*/}
                            {/*    size="md" />*/}
                            {/*<UI_ELEMENTS.Button*/}
                            {/*    icon={loadingRegister ? {dir: 'right', element: 'loading'} : {}}*/}
                            {/*    type="submit"*/}
                            {/*    text="Save"*/}
                            {/*    width={190}*/}
                            {/*/>*/}
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

ResetPassword.getInitialProps = async (ctx) => {
    // const { req, res } = ctx;
    // const token = req.headers.cookie;
    // if (!token) res.redirect('/');
    return {status: true}
};
const mapStateToProps = state => ({
    isUser: state.auth.user
});
const mapDispatchToProps = {
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);

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

const Account = (props) => {
    const [loadingRegister, setLoadingRegister] = useState(false);
    const { register, handleSubmit, watch, errors, setValue } = useForm({
        mode: 'onBlur',
    });


    useEffect(() => {
        (async () => {
            if (props.isUser) {
                const {name, email} = props.isUser;
                setValue('name', name);
                setValue('email', email);
            }
        })();
    }, [props.isUser]);
    const onSubmit = async (dataForm) => {
        setLoadingRegister(true);
        try {
            const {data} = await axios.put('/api/update/user', {
                _id: props.isUser._id,
                email: dataForm.email,
                password: dataForm.password,
                password_repeat: dataForm.password,
                name: dataForm.name,
            });
            if(data.error) throw Error(data.error);
            toast.dark('Account updated successfully. Please login again', {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false,
            });
            setTimeout(() => {
                removeCookieByKey('token');
                Router.push({
                    pathname: '/login'
                });
            }, 3000);
        } catch (err) {
            toast.error(err.response ? err.response.data : err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false,
            });
        } finally {
            setLoadingRegister(false);
        }
    };
    const password = useRef({});
    password.current = watch("password", "");
    return (
        <Container>
            <Row>
                <Col sm={{size:12}} md={{size:10, offset: 1}} lg={{size:8, offset: 2}}>
                    <div className="contact-main-wrap">
                        <h2>My Account</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <UI_ELEMENTS.Input
                                type="text"
                                name="name"
                                refBind={register(FULL_NAME_VALIDATOR)}
                                errors={errors.name && errors.name.message}
                                fullWidth={true}
                                placeholder="Name"
                                size="md" />
                            <UI_ELEMENTS.Input
                                type="email"
                                name="email"
                                attr={[{name: 'disabled', value: true}]}
                                refBind={register(EMAIL_VALIDATOR)}
                                errors={errors.email && errors.email.message}
                                fullWidth={true}
                                placeholder="Email ID"
                                size="md" />
                            <UI_ELEMENTS.Input
                                refBind={register(PASSWORD_VALIDATOR)}
                                errors={
                                    errors.password && errors.password.message ||
                                    errors.password && errors.password.type === 'containsDigit' && 'Use 1 ore more numbers' ||
                                    errors.password && errors.password.type === 'containsUppercase' && 'Use upper and lower case characters'
                                }
                                name="password"
                                type="password"
                                fullWidth={true}
                                placeholder="New Password"
                                size="md" />
                            <UI_ELEMENTS.Input
                                refBind ={register({
                                    validate: value =>
                                        value === password.current || "The passwords do not match"
                                })}
                                errors={errors.password_repeat && errors.password_repeat.message}
                                name="password_repeat"
                                type="password"
                                fullWidth={true}
                                placeholder="Confirm Password"
                                size="md" />
                            <UI_ELEMENTS.Button
                                icon={loadingRegister ? {dir: 'right', element: 'loading'} : {}}
                                type="submit"
                                text="Save"
                                width={190}
                            />
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

Account.getInitialProps = async (ctx) => {
    const { req, res } = ctx;
    const token = req.headers.cookie;
    if (!token) res.redirect('/');
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
)(Account);

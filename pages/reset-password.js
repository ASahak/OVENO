import React, {useState, useRef, useCallback} from 'react';
import { useRouter } from 'next/router'
import axios from "lib/axiosEnv";
import {connect} from "react-redux";
import {Col, Container, Row} from "reactstrap";
import {toast} from "react-toastify";
import UI_ELEMENTS from "../components/shared/UI";
import {
    EMAIL_VALIDATOR,
    PASSWORD_VALIDATOR
} from "utils";
import Head from "next/head";
import {useForm} from "react-hook-form";

const ResetPassword = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, watch, errors, reset } = useForm({
        mode: 'onBlur',
    });


    const onSubmit = async (dataForm) => {
        setLoading(true);
        try {
            if (router.query.token) {
                const {data} = await axios.put('/api/reset-password', {resetLink: router.query.token, newPassword: dataForm.password});
                if (data.error) throw Error(data.error);
                toast.dark(data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    pauseOnHover: false
                });
                setTimeout(() => {
                    location.href = '/login';
                }, 3000)
            } else {
                const {data} = await axios.put('/api/forget-password', dataForm);
                if (data.error) throw Error(data.error);
                toast.dark(data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    pauseOnHover: false
                });
            }
        } catch (err) {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: false
            });
        } finally {
            setLoading(false);
        }
        reset();
    };
    const password = useRef({});
    password.current = watch("password", "");

    const Title = useCallback(() => {
        return !router.query.token ? 'Forget Password' : 'Reset Password'
    }, [router.query.token]);

    return (
        <Container>
            <Head>
                <title>{Title()}</title>
            </Head>
            <Row>
                <Col sm={{size:12}} md={{size:10, offset: 1}} lg={{size:8, offset: 2}}>
                    <div className="contact-main-wrap">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h3>{Title()}</h3>
                            {!router.query.token ? <UI_ELEMENTS.Input
                                type="email"
                                name="email"
                                refBind={register(EMAIL_VALIDATOR)}
                                errors={errors.email && errors.email.message}
                                fullWidth={true}
                                placeholder="Email ID"
                                size="md" /> : <>
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
                            </>}
                            <UI_ELEMENTS.Button
                                icon={loading ? {dir: 'right', element: 'loading'} : {}}
                                type="submit"
                                text={router.query.token ? 'Reset' : 'Send'}
                                width={100}
                            />
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

ResetPassword.getInitialProps = async (ctx) => {
    const { req, res } = ctx;
    const token = req && req.headers.cookie;
    if (token) res.redirect('/');
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

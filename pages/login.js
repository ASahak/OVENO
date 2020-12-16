import React, {useState} from 'react';
import Head from 'next/head';
import DumpLayout from 'components/shared/Layouts/dump';
import Icon from 'components/Icons/icon';
import UI_ELEMENTS from 'components/shared/UI';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
    EMAIL_VALIDATOR,
    PASSWORD_VALIDATOR
} from 'utils';
import axios from "lib/axiosEnv";
import {toast} from "react-toastify";
const {
    setToken
} = require('../utils/auth');

const generateAlert = (reset, setLoadingRegister, typeAlert, message, _timeout)  => {
    reset();
    setLoadingRegister(false);
    toast[typeAlert](message, {
        position: "top-right",
        autoClose: _timeout,
        pauseOnHover: false,
    });
};

function LoginForm () {
    const _timeout = 3000;
    const [loadingLogin, setLoadingLogin] = useState(false);
    const { register, handleSubmit, errors, reset } = useForm({
        mode: 'onBlur',
    });
    const onSubmit = async dataLogin => {
        setLoadingLogin(true);
        const timeStart = new Date().getTime();
        try {
            const {data} = await axios.post('/api/login/user', dataLogin);
            if (data.error) throw new Error(data.error);

            setToken(data.token);
            location.href = '/';
        } catch (err) {
            console.log(err.message, 8);
            const timeEnd = new Date().getTime();
            if (timeEnd - timeStart > _timeout) {
                generateAlert(reset, setLoadingLogin, 'error', err.message, _timeout)
            } else {
                setTimeout(() => {
                    generateAlert(reset, setLoadingLogin, 'error', err.message, _timeout)
                }, (_timeout - (timeEnd - timeStart)));
            }
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <UI_ELEMENTS.Input
                name="email"
                type="email"
                refBind={register(EMAIL_VALIDATOR)}
                fullWidth={true}
                errors={errors.email && errors.email.message}
                placeholder="Email ID"
                size="md"/>
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
                placeholder="Password"
                size="md"/>
            <UI_ELEMENTS.Button
                type="submit"
                icon={loadingLogin ? {dir: 'right', element: 'loading'} : {}}
                text="Login"
                width={190}
                size="md"/>
            <Link href="/reset-password" prefetch={false}>
                <a className="link-to-reset">Forgot password? click to reset</a>
            </Link>
            <Link href="/register" prefetch={false}>
                <a className="link-to-reset">I am new here. I want an account</a>
            </Link>
        </form>
    )
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <Head>
                    <title>Login</title>
                </Head>

                <main>
                    <div className="login-form-container">
                        <div className="form-icon">
                            <Icon name="user" />
                        </div>
                        <h4 className="title-form">Member Login</h4>
                        <LoginForm/>
                    </div>
                </main>
            </div>
        )
    }
}

Login.Layout = DumpLayout;

export default Login;

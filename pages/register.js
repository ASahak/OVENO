import React, {useRef, useState} from 'react';
import Head from 'next/head'
import Icon from "components/Icons/icon";
import DumpLayout from "components/shared/Layouts/dump";
import UI_ELEMENTS from "components/shared/UI";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
    FULL_NAME_VALIDATOR,
    EMAIL_VALIDATOR,
    PASSWORD_VALIDATOR
} from 'utils';
import axios from "axios";
import {toast} from 'react-toastify';
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

function RegisterForm () {
    const _timeout = 3000;
    const [loadingRegister, setLoadingRegister] = useState(false);
    const { register, handleSubmit, watch, errors, reset } = useForm({
        mode: 'onBlur',
    });
    const onSubmit = async dataForm => {
        setLoadingRegister(true);
        const timeStart = new Date().getTime();
        try {
            dataForm.avatar = 'user.png'; // set default user avatar
            const { data } = await axios.post('/api/create/user', dataForm);
            if (data.error) throw new Error(data.error);

            setToken(data.token);
            const timeEnd = new Date().getTime();
            if (timeEnd - timeStart > _timeout) {
                generateAlert(reset, setLoadingRegister, 'dark', 'User is registered successfully', _timeout);
                setTimeout(() => {
                    location.href = '/'
                }, _timeout);
            } else {
                setTimeout(() => {
                    generateAlert(reset, setLoadingRegister, 'dark', 'User is registered successfully', _timeout);
                    setTimeout(() => {
                        location.href = '/'
                    }, _timeout);
                }, (_timeout - (timeEnd - timeStart)));
            }
        } catch (err) {
            const timeEnd = new Date().getTime();
            if (timeEnd - timeStart > _timeout) {
                generateAlert(reset, setLoadingRegister, 'error', err.message, _timeout)
            } else {
                setTimeout(() => {
                    generateAlert(reset, setLoadingRegister, 'error', err.message, _timeout)
                }, (_timeout - (timeEnd - timeStart)));
            }
        }
    };

    const password = useRef({});
    password.current = watch("password", "");
    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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
                placeholder="Password"
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
                text="Register"
                width={190}
                size="md"/>
            <Link href="/login" prefetch={false}>
                <a className="link-to-reset">I have an account already. Go to login</a>
            </Link>
        </form>
    )
}

class Register extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div className="container">
                <Head>
                    <title>Register</title>
                </Head>

                <main>
                    <div className="register-form-container">
                        <div className="form-icon">
                            <Icon name="user" />
                        </div>
                        <h4 className="title-form">Member Register</h4>
                        <RegisterForm />
                    </div>
                </main>
            </div>
        )
    }
}


Register.Layout = DumpLayout;

export default Register;

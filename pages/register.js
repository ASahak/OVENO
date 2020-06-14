import React, {useRef, useState} from 'react';
import Head from 'next/head'
import Icon from "components/Icons/icon";
import DumpLayout from "components/shared/Layouts/dump";
import UI_ELEMENTS from "components/shared/UI";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Alert from "components/shared/UI/Alert";
import {
    FULL_NAME_VALIDATOR,
    EMAIL_VALIDATOR,
    PASSWORD_VALIDATOR
} from 'utils';
import axios from "axios";
import Router from 'next/router';
// import { __bodyLoading } from 'components/shared/helpers/global-functions';


function RegisterForm () {
    // const _timeout = 4000;
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, watch, errors, reset } = useForm();
    const onSubmit = async dataForm => {
        try {
            const { data } = await axios.post('/api/create/user', dataForm);
            if (data.error) throw new Error(data.error);
            console.log(data, 'success');
            reset();
        } catch (err) {
            console.log(err.message, 'Error');
            reset();
        }
    //     const timeStart = new Date().getTime();
    //     setLoadingRegister(true);
    //     fire.auth().createUserWithEmailAndPassword(data.email, data.password).then(user => {
    //         setLoadingRegister(false);
    //         const db = fire.firestore();
    //         db.collection('users').add({
    //             id: '',
    //             fullName: data.name,
    //             email: data.email,
    //             color: data.favorite_color,
    //             messages: []
    //         }).then(_ => {
    //             const docUsers = db.doc(`users/${_.id}`);
    //             docUsers.update({'id': _.id}).then(() => {
    //                 Router.replace('/');
    //             })
    //         });
    //     }).catch(err => {
    //         setErrorMessage(err.message);
    //         setLoadingRegister(false);
    //         reset();
    //         const timeEnd = new Date().getTime();
    //         if (timeEnd - timeStart > _timeout) {
    //             setErrorMessage('');
    //         } else {
    //             setTimeout(() => {
    //                 setErrorMessage('');
    //             }, (_timeout - (timeEnd - timeStart)));
    //         }
    //     });
    };
    const password = useRef({});
    password.current = watch("password", "");
    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && <Alert
                type="error"
                timeout={_timeout}
                message={errorMessage}
            />}
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
        this.state = {
            isLoading: this.props.isLoading
        };
        // __bodyLoading(this.state.isLoading);
        // authService.__isLogged().then(res => {
        //     if (res) {
        //         Router.push('/')
        //     } else {
        //         this.setState({
        //             isLoading: false
        //         }, () => __bodyLoading(this.state.isLoading, false));
        //     }
        // })
    }

    componentDidMount() {
        // this.props.__CHANGE_STATUS_IS_LOADING(false);
    }

    render () {
        if (this.state.isLoading) return '';
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

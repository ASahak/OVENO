import React, {useState} from 'react';
import Head from 'next/head';
import DumpLayout from 'components/shared/Layouts/dump';
import Icon from 'components/Icons/icon';
import UI_ELEMENTS from 'components/shared/UI';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Alert from 'components/shared/UI/Alert';
import Router from "next/router";
// import { __bodyLoading } from 'components/shared/helpers/global-functions';

function LoginForm () {
    // const _timeout = 4000;
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, errors, reset } = useForm();
    // const onSubmit = data => {
    //     const timeStart = new Date().getTime();
    //     setLoadingLogin(true);
    //     fire.auth().signInWithEmailAndPassword(data.email, data.password).then(user => {
    //         setLoadingLogin(false);
    //         Router.replace('/');
    //     }).catch(err => {
    //         setLoadingLogin(false);
    //         setErrorMessage(err.message);
    //         reset();
    //         const timeEnd = new Date().getTime();
    //         if (timeEnd - timeStart > _timeout) {
    //             setErrorMessage('');
    //         } else {
    //             setTimeout(() => {
    //                 setErrorMessage('');
    //             }, (_timeout - (timeEnd - timeStart)));
    //         }
    //     })
    // };
    return (
        <form className="login-form">
            {errorMessage && <Alert
                type="error"
                timeout={_timeout}
                message={errorMessage}
            />}
            <UI_ELEMENTS.Input
                name="email"
                type="email"
                refBind={register({
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address"
                    }
                })}
                fullWidth={true}
                errors={errors.email && errors.email.message}
                placeholder="Email ID"
                size="md"/>
            <UI_ELEMENTS.Input
                refBind={register({
                    required: "You must specify a password",
                    minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters"
                    }
                })}
                errors={errors.password && errors.password.message}
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
        this.state = {
            isLoading: this.props.isLoading
        };
        // __bodyLoading(this.props.isLoading, false);
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

    render() {
        if (this.state.isLoading) return '';
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

import React from 'react'
import App from 'next/app';
import DefaultLayout from '../components/shared/default';
import {ToastContainer} from "react-toastify";
import { Provider } from 'react-redux';
import store from 'store';
import {
    __SET_LOGGED
} from 'store/saga';

const {
    isLoggedUser
}  = require('../utils/auth');

class Layout extends App {
    render() {

        // Save User's' data to the store
        isLoggedUser().then(res => {
            // __SET_LOGGED(res.data).next();
        }).catch(err => {
            // console.info(err)
        });

        const { Component, pageProps, initialProps } = this.props;
        const Layout = Component.Layout || DefaultLayout;

        return (
            <>
                {/*<Provider store={store}>*/}
                    <Layout>
                        <Component {...pageProps} {...initialProps}/>
                    </Layout>
                {/*</Provider>*/}
                <ToastContainer />
            </>
        );
    }
}

export default Layout;

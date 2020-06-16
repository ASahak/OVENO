import React from 'react'
import App from 'next/app';
import DefaultLayout from '../components/shared/default';
import {ToastContainer} from "react-toastify";

class Layout extends App {
    render() {
        const { Component, pageProps } = this.props;
        const Layout = Component.Layout || DefaultLayout;

        return (
            <>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <ToastContainer />
            </>
        );
    }
}

export default Layout;

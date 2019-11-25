import React from 'react'
import App from 'next/app';
import DefaultLayout from '../components/shared/default';
// import '../assets/helpers/styles/_main.scss'

// Style objects already defined

class Layout extends App {
    render() {
        const { Component, pageProps } = this.props;
        const Layout = Component.Layout || DefaultLayout;

        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        );
    }
}

export default Layout;
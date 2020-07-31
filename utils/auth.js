const cookie = require('js-cookie');
// const nextCookie = require('next-cookies');
const axios = require('axios');
const jwtDecode = require('jwt-decode');
// import React, {
//     Component,
// } from 'react';
// import Router from 'next/router';


// export const auth = ctx => {
//     const {token} = nextCookie(ctx);
//
//     if (ctx.req && !token) {
//         ctx.res.writeHead(302, {Location: "/login"});
//         ctx.res.end();
//         return;
//     }
//
//     if (!token) {
//         Router.push("/login");
//     }
//
//     return token;
// };
module.exports = {
    setToken: (token) => {
        cookie.set('token', token, {expires: 1 /*1 day*/});
    },

    getToken: () => {
        return cookie.get('token');
    },

    getCookieByKey: (key) => {
        return cookie.get(key);
    },

    removeCookieByKey: (key) => {
        cookie.remove(key);
    },
    isLoggedUser: () => {
        return new Promise(async (resolve, reject) => {
            const token = module.exports.getToken();
            try {
                if (token) {
                    const user = await axios.get('/api/user/' + jwtDecode(token).userId);
                    if (user) {
                        if (user.data.error) return;
                        resolve(user);
                    }
                }
            } catch (err) {
                reject(err)
            }
        })
    },
    // withAuthSync: WrappedComponent =>
    //     class extends React.Component {
    //
    //         static async getInitialProps(ctx) {
    //             const token = auth(ctx);
    //
    //             const componentProps =
    //                 WrappedComponent.getInitialProps &&
    //                 (await WrappedComponent.getInitialProps(ctx));
    //
    //             return { ...componentProps, token };
    //         }
    //
    //         render() {
    //             return (<WrappedComponent {...this.props} />);
    //         }
    //     }
};

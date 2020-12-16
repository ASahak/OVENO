const axios = require('axios');
const {
    getToken,
    removeCookieByKey
} = require('../utils/auth');
const jwtDecode = require('jwt-decode');
const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV !== 'production' ? process.env.CLIENT_URL : process.env.PROD_URL
});

axiosInstance.interceptors.request.use(req => {
    const token = getToken();
    if (token && jwtDecode(token).exp < Date.now() / 1000) {
        removeCookieByKey('token');
        location.href = '/';
    }
    return req;
});
module.exports = axiosInstance;

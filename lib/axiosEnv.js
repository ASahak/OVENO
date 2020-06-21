const axios = require('axios');
const {
    getToken,
    removeCookieByKey
} = require('utils');
const jwtDecode = require('jwt-decode');

axios.interceptors.request.use(_config => {
    const token = getToken();
    if (jwtDecode(token).exp < Date.now() / 1000) {
        removeCookieByKey('token');
        location.href = '/';
    }

});

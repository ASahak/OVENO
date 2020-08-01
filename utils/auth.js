const cookie = require('js-cookie');
const axios = require('axios');
const jwtDecode = require('jwt-decode');

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
                        if (user.data.error) reject(user.data.error);
                        resolve(user);
                    }
                } else reject("There isn't logged user")
            } catch (err) {
                reject(err)
            }
        })
    },
};

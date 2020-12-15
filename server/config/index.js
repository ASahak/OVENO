const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/oveno',
    port: process.env.PORT,
    email_auth_user: process.env.EMAIL_AUTH_USER,
    email_auth_password: process.env.EMAIL_AUTH_PASSWORD,
    secretKey: process.env.SECRET,
    clientURL: process.env.CLIENT_URL,
    secretKeyResetPassword: process.env.SECRET_RESET_PASSWORD,
};

const UserServices = require('../services/User.service');
const BaseServices = require('../services/BaseServices');
const User = require('../models/user.model');
const EmailSubscribe = require('../models/email_subscribe.model');
const jwt = require('jsonwebtoken');
const {
    secretKey,
    secretKeyResetPassword,
    clientURL,
    email_auth_user,
    email_auth_password
} = require('../config');
const {
    EMAIL_SUBJECT,
} = require('../../utils/constants');
const nodemailer = require("nodemailer");
const sendMail = {
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    secure: true,
    service: 'gmail',
    auth: {
        user: email_auth_user,
        pass: email_auth_password
    }
};

module.exports = class UserController {
    /**
     * Reset Password
     *
     * @param req[body]
     * @param res
     * @return {Promise<{_id: *}|*>}
     */
    static async ResetPassword ({body}, res) {
        const {resetLink, newPassword} = body;
        if (resetLink) {
            jwt.verify(resetLink, secretKeyResetPassword, (err, _decodedData) => {
                if (err) {
                    return res.status(200).send({
                        status: false,
                        error: 'Incorrect token or it is expired!'
                    });
                }
                User.findOne({resetLink}, async (err, user) => {
                    if (err || !user) {
                        return res.status(200).send({
                            status: false,
                            error: 'User with this token doesn\'t exist!',
                        });
                    }
                    try {
                        await UserServices.update_user({
                            _id: user._id,
                            password: newPassword,
                            name: user.name,
                            email: user.email
                        });
                        return res.status(200).send({
                            status: true,
                            message: 'Your password has been changed!',
                        });
                    } catch (error) {
                        res.status(200).send({
                            status: false,
                            error: error.message
                        })
                    }
                })
            })
        } else {
            return res.status(200).send({
                status: false,
                error: 'Authentication error!'
            });
        }
    }
    /**
     * Forgot Password
     *
     * @param req[body]
     * @param res
     * @return {Promise<{_id: *}|*>}
     */
    static async ForgetPassword ({body}, res) {
        const {email} = body;
        let user = await new BaseServices(User, email).IfExistByEmail(email);
        if (!user) {
            return res.status(200).send({
                status: false,
                error: 'User with this email doesn\'t exist!'
            });
        } else {
            const token = jwt.sign({_id: user._id}, secretKeyResetPassword, {expiresIn: '20m'});
            const message = {
                from: `noreply@${email_auth_user}`,
                to: email,
                subject: 'OVENO: Reset Password',
                html: `
                    <h2>Please click on given link to reset your password</h2>
                    <a href="${clientURL}/reset-password?token=${token}">Reset Password</a>  
                `
            };
            return user.updateOne({resetLink: token}, (err, _success) => {
                if (err) {
                    return res.status(200).send({
                        status: false,
                        error: 'Reset Password error'
                    });
                } else {
                    const transporter = nodemailer.createTransport({
                        ...sendMail
                    });
                    transporter.sendMail(message, function(err, _info) {
                        if (err) {
                            res.status(200).send({
                                status: false,
                                error: err.message
                            })
                        } else {
                            res.status(200).send({
                                status: true,
                                message: 'Email has been sent, kindly follow the instructions'
                            })
                        }
                    });
                }
            })
        }
    }

    /**
     * Subscribe via email
     *
     * @param req[body]
     * @param res
     * @return {Promise<{_id: *}|*>}
     */
    static async SubscribeEmail ({body}, res) {
        // Check if this user already exists
        let user = await new BaseServices(EmailSubscribe, body.email).IfExistByEmail(body.email);
        if (user) {
            return res.status(200).send({
                status: false,
                error: 'That user already exists!'
            });
        } else {
            try {
                await UserServices.add_email_subscribe(body.email);
                res.status(200).send({
                    status: true,
                    message: 'You will receive emails for any updates!'
                });
            } catch (error) {
                res.status(200).send({
                    status: false,
                    message: error.message,
                });
            }
        }
    }
    /**
     * Send Mail
     *
     * @param req
     * @param res
     * @return {Promise<{_id: *}|*>}
     */
    static async SendMail (req, res) {
        const isForSubscribers = req.body.mailToSubscribers;
        let mails = [];
        try {
            if (isForSubscribers) { // if there are subscribed user which should send notification
                let emails = await new BaseServices(EmailSubscribe).getAllFromCollection();
                mails = emails ? [...emails.map(e => e.email)] : [];
            }
            const transporter = nodemailer.createTransport({
                ...sendMail
            });
            const message = {
                from: `From ${isForSubscribers ? email_auth_user : req.body.email}<donotreply@${isForSubscribers ? email_auth_user : req.body.email}>`,
                to: isForSubscribers ? mails : email_auth_user,
                subject: EMAIL_SUBJECT,
                text: isForSubscribers ? 'There are some new products, maybe you interested with it?' : req.body.description,
            };
            transporter.sendMail(message, function(err, _info) {
                if (err) {
                    res.status(200).send({
                        status: false,
                        error: err.message
                    })
                } else {
                    res.status(200).send({
                        status: true,
                        message: 'Message was successfully send'
                    })
                }
            });
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message
            })
        }
    }
    /**
     * User Sign up
     *
     * @param req[body] inputSignUp user data (name, email, password)
     * @param res
     * @return {Promise<{_id: *, token: *}|*>}
     */
    static async CreateUser (req, res) {
        // Check if this user already exists
        let user = await new BaseServices(User, req.body.email).IfExistByEmail(req.body.email);
        if (user) {
            return res.status(200).send({
                status: false,
                error: 'That user already exists!'
            });
        } else {
            try {
                // Insert the new user if they do not exist yet
                user = await UserServices.create_user(req.body);
                const token = jwt.sign({userId: user._id}, secretKey, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({
                    status: true,
                    token: `Bearer ${token}`,
                    user
                })
            } catch (error) {
                res.status(200).send({
                    status: false,
                    error: error.message
                })
            }
        }
    }

    /**
     * Users sign in
     *
     * @param req
     * @param req.body (email, password)
     * @param res
     * @return {Promise<{_id: *, token: *}|*>}
     */

    static async LoginUser ({body}, res) {
        try {
            let user = await new BaseServices(User, body.email).IfExistByEmail(body.email);
            if (!user) {
                throw Error('User with the email ' + body.email + ' is not found.')
            } else {
                const match = await UserServices.verifyPassword(body.password, user.password);
                if (!match) throw Error('Password does not match! email ' + body.email);

                let token = jwt.sign({userId: user._id.toString()}, secretKey, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({
                    token: `Bearer ${token}`,
                    _id: user._id,
                    user});
            }
        } catch (err) {
            res.status(200).send({
                status: false,
                error: err.message
            });
        }
    }

    /**
     * Get User's data
     *
     * @param req
     * @param req.body (id)
     * @param res
     * @return {Promise<{_id: *, user: *}|*>}
     */
    static async GetUser ({params}, res) {
        try {
            const user = await new BaseServices(User, 'Some User').getById(params.id);
            if (user) {
                res.status(200).send({
                    user
                })
            }
        } catch (err) {
            res.status(200).send({
                error: err.message
            })
        }
    }

    /**
     * User Update
     *
     * @param req.{body} inputSignUp user data (name, email, password)
     * @param res
     * @return {Promise<{_id: *, token: *}|*>}
     */
    static async UpdateUser (req, res) {
        try {
            // Insert the new user if they do not exist yet
            let user = await UserServices.update_user(req.body);
            res.status(200).send({
                status: true,
                user
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message
            })
        }
    }

};

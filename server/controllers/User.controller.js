const UserServices = require('../services/User.service');
const BaseServices = require('../services/BaseServices');
const User = require('../models/user.model');
const EmailSubscribe = require('../models/email_subscribe.model');
const jwt = require('jsonwebtoken');
const {
    secretKey
} = require('../config');
const {
    EMAIL_AUTH_PASSWORD,
    EMAIL_AUTH_USER,
    EMAIL_SUBJECT,
} = require('../../utils/constants');
const nodemailer = require("nodemailer");


module.exports = class UserController {
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
                port: 465,               // true for 465, false for other ports
                host: "smtp.gmail.com",
                secure: true,
                service: 'gmail',
                auth: {
                    user: EMAIL_AUTH_USER,
                    pass: EMAIL_AUTH_PASSWORD
                }
            });
            const message = {
                from: `From ${isForSubscribers ? EMAIL_AUTH_USER : req.body.email}<donotreply@${isForSubscribers ? EMAIL_AUTH_USER : req.body.email}>`,
                to: isForSubscribers ? mails : EMAIL_AUTH_USER,
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

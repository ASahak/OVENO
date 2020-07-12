const UserServices = require('../services/User.service');
const BaseServices = require('../services/BaseServices');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {
    secretKey
} = require('../config');


module.exports = class UserController {
    /**
     * User Sign up
     *
     * @param body inputSignUp user data (name, email, password)
     * @param res
     * @param headers
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
};

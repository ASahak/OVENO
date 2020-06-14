const UserServices = require('../services/User.service');
const BaseServices = require('../services/BaseServices');
const User = require('../models/user.model');


module.exports = class UserController {
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
    }
};

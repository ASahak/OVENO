const User = require('../models/user.model');

module.exports = class UserService {
    static async create_user (body) {
        const user = new User({
            name: body.name,
            email: body.email,
            password: body.password,
        });
        try {
            const newUser = await user.save();
            return newUser
        } catch (err) {
            throw Error(err);
        }
    }
};

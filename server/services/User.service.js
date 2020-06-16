const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = class UserService {
    static async create_user (body) {
        const newUserPass = await bcrypt.hash(body.password, 10);
        const user = new User({
            name: body.name,
            email: body.email,
            password: newUserPass,
        });
        try {
            const newUser = await user.save();
            return newUser
        } catch (err) {
            throw Error(err);
        }
    }

    static async verifyPassword (password, passHash) {
        return await bcrypt.compare(password, passHash);
    }
};

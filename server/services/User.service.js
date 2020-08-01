const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const roleTypes = require('../../utils').ROLE_TYPES;

module.exports = class UserService {
    static async create_user (body) {
        const newUserPass = await bcrypt.hash(body.password, 10);
        const user = new User({
            name: body.name,
            email: body.email,
            password: newUserPass,
            cart: [],
            roleType: roleTypes.USER
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

const User = require('../models/user.model');
const EmailSubscribe = require('../models/email_subscribe.model');
const bcrypt = require('bcrypt');
const roleTypes = require('../../utils').ROLE_TYPES;

module.exports = class UserService {
    static async add_email_subscribe (email) {
        try {
            const email_subscribe = EmailSubscribe({
               email
            });
            return await email_subscribe.save()
        } catch (err) {
            throw Error(err);
        }
    }

    static async create_user (body) {
        const newUserPass = await bcrypt.hash(body.password, 10);
        const user = new User({
            name: body.name,
            email: body.email,
            avatar: body.avatar,
            password: newUserPass,
            cart: [],
            roleType: roleTypes.USER
        });
        try {
            return await user.save();
        } catch (err) {
            throw Error(err);
        }
    }

    static async update_user (body) {
        let newUserPass;
        if (body.password) {
            newUserPass = await bcrypt.hash(body.password, 10);
        }
        try {
            return await User.findOneAndUpdate(
                {_id: body._id},
                {
                    $set: {
                        ...(newUserPass && {password: newUserPass}),
                        name: body.name,
                        email: body.email,
                        avatar: body.avatar,
                    }
                },
                {new: true, upsert: true }, () => {});
        } catch (err) {
            throw Error(err);
        }
    }

    static async verifyPassword (password, passHash) {
        return await bcrypt.compare(password, passHash);
    }
};

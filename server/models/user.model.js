const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const roleTypes = require('../../utils').ROLE_TYPES;
let UserSchema = new Schema({
    _id: {
        type: ObjectId,
        auto: true
    },
    name: {
        type: String,
        minLength: 2,
        maxLength:256,
        required: true,
    },
    email: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
    },
    cart: {
        type: Array,
        required: true,
    },
    roleType: {
        type: String,
        enum: [roleTypes.ADMIN, roleTypes.USER],
        defaultValue: roleTypes.USER,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {versionKey: false, timestamps: true});

module.exports = mongoose.model('User', UserSchema);

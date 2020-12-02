const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let EmailSchema = new Schema({
    _id: {
        type: ObjectId,
        auto: true
    },
    email: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
    },
}, {versionKey: false, timestamps: true});

module.exports = mongoose.model('EmailSubscribe', EmailSchema);

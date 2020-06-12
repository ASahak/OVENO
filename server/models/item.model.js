const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100,
    },
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        max: 200
    },
}, {versionKey: false});

module.exports = mongoose.model('Item', ItemSchema);

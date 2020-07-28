const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
let ProductSchema = new Schema({
    _id: {
        type: ObjectId,
        auto: true
    },
    name: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
    },
    sale: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    photo: {
        type: String,
        default: '',
    },
    rating: {
        type: Array,
        required: true,
    },
    subCategory: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);

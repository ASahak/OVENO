const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

let CategorySchema = new Schema({
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
    slug: { type: String, slug: "name", slugOn: { update: true } }
}, {timestamps: true});

module.exports = mongoose.model('Category', CategorySchema);

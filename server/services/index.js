const Item = require('../models/user.model');
const {
    EVERY_PAGE
} = require('../../utils/constants');

module.exports = class ItemService {
    static async saveItem(body) {
        const item = new Item({
            name: body.name,
            date: body.date,
            description: body.description,
        });
        try {
            const newItem = await item.save();
            return newItem
        } catch (err) {
            throw Error(err);
        }
    }

    static async updateItem (newData, id) {
        const doc = await Item.findById(id);
        doc.overwrite({_id: id, ...newData});
        return await doc.save();
    }

    static async deleteItem (id) {
        await Item.deleteOne({_id: id});
    }

    static getAllItems (page, regex) {
        return Item.find({...(regex && {name: regex})}).populate('bookId')
        .skip((EVERY_PAGE * page) - EVERY_PAGE)
        .limit(EVERY_PAGE)
    }

    static getItemsCount (regex) {
        return Item.countDocuments({...(regex && {name: regex})})
    }

    static getItem (id) {
        return Item.findById(id, (err, result) => {
            return result;
        });
    }

};

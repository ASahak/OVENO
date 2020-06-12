const services = require('../services');

module.exports = class ProductController {
    static async create ({body}, res) {
        try {
            const savedItem = await services.saveItem(body);
            return res.redirect('/list/1')
        }catch (e){
            return res.redirect('/add?err=' + encodeURIComponent(e.message));
        }
    }

    static async update ({body, params}, res) {
        try {
            const updatedItem = await services.updateItem(body, params.id);
            return res.redirect('/list/1')
        }catch (e){
            return res.redirect('/edit/' + params.id + '?err=' + encodeURIComponent(e.message));
        }
    }
    static async delete ({body, params}, res) {
        try {
            const deletedItem = await services.deleteItem(params.id);
            return res.redirect('/list/1')
        }catch (e){
            return res.redirect('/list/1')
        }
    }
};

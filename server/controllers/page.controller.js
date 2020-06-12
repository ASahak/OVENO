const services = require('../services');
const {
    EVERY_PAGE
} = require('../../utils/constants');

const escapeRegex =  require('../../utils/globalFunctions');


module.exports = class PageController {

    static async homePage (req, res) {
        try {
            // Declaring query based/search variables
            const searchQuery = req.query.search,
                  regex = req.query.search ? new RegExp(escapeRegex(req.query.search), 'gi') : '';

            const data = await services.getAllItems(req.params.page, regex);
            const count = await services.getItemsCount(regex);
            res.render('pages/index', {
                page_name: 'home',
                listData: data,
                currentPage: req.params.page,
                countItems: count,
                searchVal: searchQuery,
                pages: Math.ceil(count / EVERY_PAGE)
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    static async editPage (req, res) {
        const data = await services.getItem(req.params.id);

        res.render('pages/edit', {
            error: req.query.err,
            data,
        })
    }
};

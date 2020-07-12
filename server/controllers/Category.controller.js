const CategoryServices = require('../services/Category.service');
const BaseServices = require('../services/BaseServices');
const Category = require('../models/category.model');
const SubCategory = require('../models/sub-category.model');

module.exports = class CategoryController {
    /**
     * Add Category
     *
     * @param req.{body} category's name (name)
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
     */
    static async Add (req, res) {
        try {
            // Insert the new Category
            const category = await CategoryServices.create_category(req.body);
            res.status(200).send({
                status: true,
                message: 'Category was added successfully!',
                category
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message
            })
        }
    }
    /**
     * Add SubCategory
     *
     * @param req.{body} subCategory's name (name), category (parent Category's name)
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
     */
    static async AddSub (req, res) {
        try {
            // Insert the new Sub Category
            const subCategory = await CategoryServices.create_category_sub(req.body);
            res.status(200).send({
                status: true,
                message: 'Sub Category was added successfully!',
                subCategory
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message
            })
        }
    }
    /**
     * Get Categories
     * @param req
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
     */
    static async GetCategories (req, res) {
        try {
            // Get All Categories
            const category = await new BaseServices(Category).getAllFromCollection();
            const subCategory = await new BaseServices(SubCategory).getAllFromCollection();
            res.status(200).send({
                status: true,
                category,
                subCategory
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message
            })
        }
    }

    /**
     * @param body.name equal category name
     * @param res
     * @return {Promise<{_id: *, success: *}|*>}
     * */
    static async Remove ({body}, res) {
        try {
            await CategoryServices.remove_category(body.name);
            res.status(200).send({
                status: true,
                message: 'Category was removed successfully!',
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message
            })
        }
    }

    /**
     * @param body.name equal Sub Category name
     * @param body.category equal Category name
     * @param res
     * @return {Promise<{status: boolean, success: *}|*>}
     * */
    static async RemoveSub ({body}, res) {
        try {
            const removedSubCategory = await CategoryServices.remove_sub_category(body.name, body.category);
            res.status(200).send({
                status: true,
                removedSubCategory,
                message: 'Sub Category was removed successfully!',
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message
            })
        }
    }

    /**
     * @param body
     * @param body.name equal Sub Category name
     * @param body.text equal Sub Category new Name
     * @param res
     * @return {Promise<{status: boolean, success: *}|*>}
     * */
    static async Update ({body}, res) {
        try {
            const updatedCategory = await CategoryServices.update_category(body);
            res.status(200).send({
                status: true,
                updatedCategory,
                message: 'Category was updated successfully!',
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message
            })
        }
    }

    /**
     * @param body
     * @param body.name equal Sub Category name
     * @param body.newName equal Sub Category new Name
     * @param body.category equal Category name
     * @param res
     * @return {Promise<{status: boolean, success: *}|*>}
     * */
    static async UpdateSub ({body}, res) {
        try {
            const updatedSubCategory = await CategoryServices.update_sub_category(body);
            res.status(200).send({
                status: true,
                updatedSubCategory,
                message: 'Sub Category was updated successfully!',
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message
            })
        }
    }
};

const ProductServices = require('../services/Product.service');
const BaseServices = require('../services/BaseServices');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const SubCategory = require('../models/sub-category.model');
const upload = require('../middleware/upload');

module.exports = class ProductController {

    /**
     * Upload image
     *
     * @param req product data
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
     */
    static UploadImage (req, res) {
        upload (req, res, (err) => {
            if (err) {
                res.status(200).send({
                    success: false,
                    message: err.message,
                })
            } else {
                res.status(200).send({
                    success: true,
                    file: req.file,
                })
            }
        });
    }
    /**
     * Add Product
     *
     * @param req.{body} product data
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
     */
    static async AddProduct ({body}, res) {
        try {
            // Insert the new Product
            const product = await ProductServices.create_product(body);
            res.status(200).send({
                status: true,
                message: 'Product was added successfully!',
                product
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message
            })
        }
    }

    /**
     * Get Products
     *
     * @param req.{body.filter.price} product's filters by price
     * @param req.{body.filter.category} product's filters by category
     * @param req.{body.page} product page
     * @param req.{body} product data
     * @param req.{query} search params
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
     */
    static async GetAll ({body, query}, res) {
        try {
            const products = await ProductServices.get_paginate_collection(query);
            res.status(200).send({
                products,
                status: true,
            })
        } catch (error) {
            res.status(200).send({
                message: error.message,
                status: false,
            })
        }
    }

    /**
     * Delete Product
     *
     * @param req.{body._id} product's id
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
     */
    static async DeleteProduct ({body}, res) {
        try {
            await new BaseServices(Product).delete(body.id);
            res.status(200).send({
                message: 'Product was removed successfully!',
                success: true,
            })
        } catch (error) {
            res.status(200).send({
                error: error.message,
                success: false,
            })
        }
    }

    /**
     * Update Product
     *
     * @param req.{params._id} product's id
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
     */
    static async UpdateProduct (req, res) {
        try {
            const updatedProduct = await ProductServices.update_product({body: req.body, id: req.params.id});
            res.status(200).send({
                status: true,
                updatedProduct,
                message: 'Product was updated successfully!',
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message
            })
        }
    }
    /**
     * Get count of Products
     *
     * @param req
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
     */
    
    static async GetAllCount (req, res) {
        try {
            let categoryName;
            let subCategoryName;
            if (req.query.category) {
                categoryName = await Category.findOne({slug: req.query.category});
                if (req.query.subCategory) {
                    subCategoryName = await SubCategory.findOne({slug: req.query.subCategory, category: categoryName.name})
                }
            }
            const count = await Product.find({
                ...(req.query.category && {category: categoryName.name}),
                ...(req.query.subCategory && {subCategory: subCategoryName.name}),
                price: {$gte: req.query.filterMin, $lte: req.query.filterMax }
            }).countDocuments();

            res.status(200).send({
                status: true,
                count,
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message,
            })
        }
    }

    /**
     * Get specific Product
     *
     * @param req, {req.query}
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
     */
    static async GetProduct ({params}, res) {
        try {
            const product = await new BaseServices(Product, 'Product').getById(params.id);
            res.status(200).send({
                status: true,
                product,
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message,
            })
        }
    }

    /**
     * Appreciate Product
     *
     * @param req, {req.query}
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
     */
    static async AppreciateProduct ({body}, res) {
        try {
            await ProductServices.appreciate_product({id: body.id, user: body.userId, value: body.value});
            res.status(200).send({
                status: true,
                appreciate: {
                    id: body.userId,
                    value: body.value,
                },
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message,
            })
        }
    }
};

const Product = require('../models/product.model');
const Category = require('../models/category.model');
const SubCategory = require('../models/sub-category.model');

module.exports = class ProductService {
    static async create_product(body) {
        const product = new Product({
            name: body.name,
            sale: body.sale,
            price: body.price,
            photo: body.photo,
            category: body.category,
            subCategory: body.subCategory,
            rating: body.rating,
        });
        try {
            const newProduct = await product.save();
            return newProduct
        } catch (err) {
            throw Error(err);
        }
    }
    static async update_product ({body, id}) {
        try {
            const updatedProd =  await Product.findOneAndUpdate(
                { _id: id },
                { $set: {
                    name: body.name,
                    sale: body.sale,
                    price: body.price,
                    photo: body.photo,
                    category: body.category,
                    subCategory: body.subCategory,
                    rating: body.rating,
                    } },
                {new: true, upsert: true }, () => {});
            return {
                ...updatedProd._doc,
            }
        } catch (err) {
            throw Error(err);
        }
    }
    static async get_paginate_collection ({
        limit,
        page,
        category,
        subCategory,
        filterMin,
        filterMax}) {
        try {
            let categoryName;
            let subCategoryName;
            if (category) {
                categoryName = await Category.findOne({slug: category});
                if (subCategory) {
                    subCategoryName = await SubCategory.findOne({slug: subCategory, category: categoryName.name})
                }
            }
            return await Product.find({
                ...(category && {category: categoryName.name}),
                ...(subCategory && {subCategory: subCategoryName.name}),
                price: {$gte: filterMin, $lte: filterMax }
            }).limit(+limit).skip((+page === 1 ? 0 : +page - 1) * +limit);
        } catch (err) {
            throw Error(err)
        }
    }
};

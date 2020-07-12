const Category = require('../models/category.model');
const SubCategory = require('../models/sub-category.model');

module.exports = class CategoryService {
    static async create_category (body) {
        const category = new Category({
            name: body.name,
        });
        try {
            const newCategory = await category.save();
            return newCategory
        } catch (err) {
            throw Error(err);
        }
    }

    static async create_category_sub (body) {
        const subCategory = new SubCategory({
            name: body.name,
            category: body.category
        });
        try {
            const newSubCategory = await subCategory.save();
            return newSubCategory
        } catch (err) {
            throw Error(err);
        }
    }
    static async remove_category (name) {
        try {
            // Should remove all sub categories's which are depends from parent category
            await SubCategory.deleteMany(
                { category: name }
            );
            return await Category.deleteOne({name: name});
        } catch (err) {
            throw Error(err);
        }
    }

    static async remove_sub_category (name, category) {
        try {
            await SubCategory.deleteOne({name, category});
            return {
                name
            }
        } catch (err) {
            throw Error(err);
        }
    }
    static async update_sub_category ({name, newName, category}) {
        try {
            const updatedSub =  await SubCategory.findOneAndUpdate(
                { name, category },
                { $set: { name: newName } },
                {new: true, upsert: true }, () => {});
            return {
                ...updatedSub._doc,
                oldName: name,
            }
        } catch (err) {
            throw Error(err);
        }
    }
    static async update_category ({name, text}) {
        try {
            // Should update all sub categories's parent category field
            await SubCategory.updateMany(
                { category: name },
                { $set: { category : text } }
            );
            return await Category.findOneAndUpdate(
                { name },
                { $set: { name : text } },
                {new: true, upsert: true}, () => {});
        } catch (err) {
            throw Error(err);
        }
    }
};

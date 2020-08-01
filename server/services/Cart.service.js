const User = require('../models/user.model');
const Product = require('../models/product.model');

module.exports = class CartService {
    static async add_to_cart ({userId, prodId, count}) {
        try {
            const user = await User.findOne({_id: userId});
            if (user.cart.some(el => el._id === prodId)) {
                throw Error('You have this product in your cart already!');
            }

            return await User.findOneAndUpdate(
                {_id: userId},
                {$set: {
                    cart: [...user.cart, {_id: prodId, count}]
                }},
                {new: true, upsert: true }, () => {});
        }  catch (err) {
            throw Error(err);
        }
    }

    static async get_all_cart_data (ids) {
        try {
            return await Product.find(
                {'_id' : {
                        $in: [...ids]
                    }
                }
            )
        } catch (err) {
            throw Error(err);
        }
    }

    static async update_count ({userId, prodId, count}) {
        try {
            const user = await User.findOne({_id: userId});
            const matchedProd = user.cart.findIndex(el => el._id === prodId);
            if (matchedProd > -1) {
                user.cart[matchedProd].count = count;
            }
            return await User.findOneAndUpdate(
                {_id: userId},
                {
                    $set: {
                        cart: user.cart
                    }
                },
                {new: true, upsert: true }, () => {});
        } catch (err) {
            throw Error(err);
        }
    }

    static async delete_product ({userId, prodId}) {
        try {
            const user = await User.findOne({_id: userId});
            const matchedProd = user.cart.findIndex(el => el._id === prodId);
            if (matchedProd > -1) {
                user.cart.splice(matchedProd, 1);
            }
            return await User.findOneAndUpdate(
                {_id: userId},
                {
                    $set: {
                        cart: user.cart
                    }
                },
                {new: true, upsert: true }, () => {});
        } catch (err) {
            throw Error(err);
        }
    }
};

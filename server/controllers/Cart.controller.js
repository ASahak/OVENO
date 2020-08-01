const CartServices = require('../services/Cart.service');


module.exports = class CartController {
    /**
     * Add To Cart Product
     *
     * @param req{body} userId, productId, countProduct
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
    */
    static async AddToCart ({body}, res) {
        try {
            await CartServices.add_to_cart({userId: body.userId, prodId: body.id, count: body.count});
            return res.status(200).send({
                status: true,
                message: 'Successfully added in your cart!',
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message,
            })
        }
    }
    /**
     * Get All Cart Products
     *
     * @param req{query} prodIds
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
    */
    static async GetCartData ({query}, res) {
        try {
            const data = await CartServices.get_all_cart_data(query.ids);
            return res.status(200).send({
                status: true,
                products: data,
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message,
            })
        }
    }

    /**
     * Update Products count
     *
     * @param req{body} prodId, userId, count
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
    */
    static async UpdateProductCount ({body}, res) {
        try {
            await CartServices.update_count({userId: body.userId, prodId: body.id, count: body.count});
            return res.status(200).send({
                status: true,
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message,
            })
        }
    }
    /**
     * Delete Product from Cart
     *
     * @param req{body} prodId, userId, count
     * @param res
     * @return {Promise<{_id: *, data: *}|*>}
    */
    static async DeleteProductFromCart ({body}, res) {
        try {
            await CartServices.delete_product({userId: body.userId, prodId: body.id});
            return res.status(200).send({
                status: true,
            })
        } catch (error) {
            res.status(200).send({
                status: false,
                error: error.message,
            })
        }
    }
};

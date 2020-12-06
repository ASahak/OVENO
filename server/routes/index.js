const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controller');
const CategoryController = require('../controllers/Category.controller');
const ProductController = require('../controllers/Product.controller');
const CartController = require('../controllers/Cart.controller');
const {
    UserValidator,
    DynamicValidator,
    CategoryValidator,
    SubCategoryValidator,
    ProductAddValidator,
} = require('../validators');
const middleware = require('../middleware');
const {
    ROLE_TYPES
} = require('../../utils');
const userAuth = require('../middleware/userAuth');

const requiresRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.roleType === role) {
            next();
        } else {
            res.status(403).send('Permission Denied');
        }
    };
};
const isAdminMiddleware = requiresRole(ROLE_TYPES.ADMIN);

// ____ Products

/* Categories Routes */

router.delete('/remove/category', [userAuth, isAdminMiddleware], CategoryController.Remove);

/*Add Category*/
router.post('/add/category', [userAuth, isAdminMiddleware, middleware(CategoryValidator, (res, error) => {
    res.status(200).send({error})
})], CategoryController.Add);

/* Update Category*/
router.put('/update/category', [userAuth, isAdminMiddleware], CategoryController.Update);

/*Add Sub Category*/
router.post('/add/subCategory', [userAuth, isAdminMiddleware, middleware(SubCategoryValidator, (res, error) => {
    res.status(200).send({error})
})], CategoryController.AddSub);

/*Remove Sub Category*/
router.delete('/delete/subCategory', [userAuth, isAdminMiddleware], CategoryController.RemoveSub);

/*Update Sub Category*/
router.put('/update/subCategory', [userAuth, isAdminMiddleware], CategoryController.UpdateSub);


router.get('/get/categories', CategoryController.GetCategories);


// _____ Products

/*Upload Images*/
router.post('/product/upload', ProductController.UploadImage);

/*Add Product*/
router.post('/product/add', [userAuth, middleware(ProductAddValidator, (res, error) => {
    res.status(200).send({error})
})], ProductController.AddProduct);

/*Get All List by page*/
router.get('/products/get', ProductController.GetAll);

/*Get All Random List*/
router.get('/products/getRandom', ProductController.GetRandomProducts);

/*Get Best Sellers List*/
router.get('/products/getBestSellers', ProductController.GetBestSellers);

/*Get Specific product*/
router.get('/product/:id', ProductController.GetProduct);

/*Get All Product count*/
router.get('/products/getCount', ProductController.GetAllCount);

/*Delete specific product*/
router.delete('/product/delete', [userAuth], ProductController.DeleteProduct);

/*Update specific product*/
router.put('/product/update/:id', [userAuth, middleware(ProductAddValidator, (res, error) => {
    res.status(200).send({error})
})], ProductController.UpdateProduct);

/*Appreciate specific product*/
router.post('/product/appreciate', [userAuth], ProductController.AppreciateProduct);

/*Add to Cart specific product*/
router.post('/cart/addToCart', [userAuth], CartController.AddToCart);

/*Get All Cart Data*/
router.get('/cart/getCart', [userAuth], CartController.GetCartData);

/*Update Cart product count*/
router.put('/cart/updateCount', [userAuth], CartController.UpdateProductCount);

/*Update Cart product count*/
router.delete('/cart/deleteProduct', [userAuth], CartController.DeleteProductFromCart);


// ____ Users


/*Forget Password*/
router.put('/forget-password', UserController.ForgetPassword);

/*Reset Password*/
router.put('/reset-password', UserController.ResetPassword);

/*Send Mail*/
router.post('/sendMail', UserController.SendMail);

// Subscribe via email
router.put('/subscribeEmail', UserController.SubscribeEmail);

/*Get User Data*/
router.get('/user/:id', UserController.GetUser);


// _____ Sign Up
router.post('/create/user', middleware(UserValidator, (res, error) => {
    res.status(200).send({error})
}), UserController.CreateUser);

// _____ Update User
router.put('/update/user', middleware(UserValidator, (res, error) => {
    res.status(200).send({error})
}), UserController.UpdateUser);


// ______ Sign In
router.post('/login/user', middleware(DynamicValidator.setFields(
    {
        email: DynamicValidator.email,
        password: DynamicValidator.passwordSignIn,
    }
), (res, error) => {
    res.status(200).send({error})
}), UserController.LoginUser);

module.exports = router;

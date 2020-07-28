const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controller');
const CategoryController = require('../controllers/Category.controller');
const ProductController = require('../controllers/Product.controller');
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

/*Get All Product count*/
router.get('/products/getCount', ProductController.GetAllCount);

/*Delete specific product*/
router.delete('/product/delete', [userAuth], ProductController.DeleteProduct);

/*Update specific product*/
router.put('/product/update/:id', [userAuth, middleware(ProductAddValidator, (res, error) => {
    res.status(200).send({error})
})], ProductController.UpdateProduct);


// ____ Users

/*Get User Data*/
router.get('/user/:id', UserController.GetUser);


// _____ Sign Up
router.post('/create/user', middleware(UserValidator, (res, error) => {
    res.status(200).send({error})
}), UserController.CreateUser);


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

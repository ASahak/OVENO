const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controller');
const CategoryController = require('../controllers/Category.controller');
const {
    UserValidator,
    DynamicValidator,
    CategoryValidator,
    SubCategoryValidator
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

// Add Category
router.post('/add/category', [userAuth, isAdminMiddleware, middleware(CategoryValidator, (res, error) => {
    res.status(200).send({error})
})], CategoryController.Add);

// Update Category
router.put('/update/category', [userAuth, isAdminMiddleware], CategoryController.Update);

// Add Sub Category
router.post('/add/subCategory', [userAuth, isAdminMiddleware, middleware(SubCategoryValidator, (res, error) => {
    res.status(200).send({error})
})], CategoryController.AddSub);

// Remove Sub Category
router.delete('/delete/subCategory', [userAuth, isAdminMiddleware], CategoryController.RemoveSub);

// Update Sub Category
router.put('/update/subCategory', [userAuth, isAdminMiddleware], CategoryController.UpdateSub);


router.get('/get/categories', CategoryController.GetCategories);


// ____ Users

// Get User Data
router.get('/user/:id', UserController.GetUser);

/*Sign Up*/
router.post('/create/user', middleware(UserValidator, (res, error) => {
    res.status(200).send({error})
}), UserController.CreateUser);


/*Sign In*/
router.post('/login/user', middleware(DynamicValidator.setFields(
    {
        email: DynamicValidator.email,
        password: DynamicValidator.passwordSignIn,
    }
), (res, error) => {
    res.status(200).send({error})
}), UserController.LoginUser);

module.exports = router;

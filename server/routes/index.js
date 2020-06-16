const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controller');

const { UserValidator, DynamicValidator } = require('../validators');
const middleware = require('../middleware');


// Users

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

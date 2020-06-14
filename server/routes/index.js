const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controller');

const { UserValidator } = require('../validators');
const middleware = require('../middleware');


// router.post('/create', middleware(todoValidator, /*CallBack error*/(res, msg) => {
//     // res.render('pages/addList', {
//     //     error: msg,
//     // });
//     res.redirect('/add?err=' + encodeURIComponent(msg))
// }), ItemController.create);

// Users
router.post('/create/user', middleware(UserValidator, (res, error) => {
    res.status(200).send({error})
}), UserController.CreateUser);

module.exports = router;

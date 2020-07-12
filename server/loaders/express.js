const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('../routes');
const passport = require('passport');
const path = require('path');
const methodOverride = require('method-override');

module.exports = class ExpressLoader {
    static init ({ app }) {
        // View Engine
        app.set('view engine', 'ejs');
        app.use(cookieParser());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        // Init Passport for authentication
        app.use(passport.initialize());
        app.use(passport.session());
        require('../middleware/passport')(passport);

        app.use(methodOverride('_method'));

        app.set("views", path.join(__dirname, "../views"));

        app.use(express.static(path.join(__dirname, "../../public")));



        // Api Routes
        app.use('/api', routes);

        // Redirect to main page
        // app.use('*', (req, res, next) => {
        //     if (req.url === '/') {
        //         res.redirect('/list/1')
        //     } else next()
        // });

        // validation middleware
        // router.use(function(req,res,next){
        //     var token=req.body.token || req.headers['token'];
        //     if(token){
        //         jwt.verify(token,process.env.SECRET_KEY,function(err,ress){
        //             if(err){
        //                 res.status(500).send('Token Invalid');
        //             }else{
        //                 next();
        //             }
        //         })
        //     }else{
        //         res.send('Please send a token')
        //     }
        // })

        return app;
    }
};

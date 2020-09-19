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
        app.use(cookieParser());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        // Init Passport for authentication
        app.use(passport.initialize());
        app.use(passport.session());
        require('../middleware/passport')(passport);

        app.use(methodOverride('_method'));

        app.use(express.static(path.join(__dirname, "../../public")));



        // Api Routes
        app.use('/api', routes);

        return app;
    }
};

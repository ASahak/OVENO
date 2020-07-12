const passport = require('passport');
const express = require('express');
const router = express.Router();

/**
 * @DESC Passport middleware
 */
router.all('*', function (req, res, next) {
    passport.authenticate('jwt', { session: false }, function(err, user, info) {
        if (user) {
            req.user = user;
            return next();
        }
        // If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
        if (err || !user) {
            res.status(200).send({
                error: {
                    code: "INVALID_AUTHORIZATION_CODE",
                    message: "Invalid authorization code"
                }
            });
            return next(info);
        } else {
            return next();
        }
    })(req, res, next);
});

module.exports = router;

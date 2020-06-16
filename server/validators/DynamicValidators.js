const Joi = require('@hapi/joi');

/**
 *
 * @param {object} fields
 * @return {*}
 */
module.exports = {
    setFields: (fields) => {
        return Joi.object(fields);
    },

    passwordSignIn: Joi.string()
        .min(8)
        .max(30)
        .required(),

    email: Joi.string()
    .required()
    .email({
        minDomainSegments: 2
        , /*tlds: { allow: ['com', 'net'] }*/
    })
};

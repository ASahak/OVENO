let Joi = require('@hapi/joi');
const JoiDate = require('@hapi/joi-date');
Joi = Joi.extend(JoiDate);
const {
    FULL_NAME_PATTERN,
    EMAIL_PATTERN,
    AT_LEAST_ONE_DIGIT_AND_UPPER
} = require('../../utils');

const schema = Joi.object({
    name: Joi.string()
        .regex(new RegExp(FULL_NAME_PATTERN), 'Please write your name in format: John Doe')
        .min(2)
        .max(255)
        .required(),

    email: Joi.string()
        .regex(new RegExp(EMAIL_PATTERN), 'Please write your email address in format: yourname@example.com')
        .email({
            minDomainSegments: 2
            , /*tlds: { allow: ['com', 'net'] }*/
        })
        .required(),

    password: Joi.string()
        .regex(new RegExp(AT_LEAST_ONE_DIGIT_AND_UPPER), 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number')
        .min(8)
        .required(),
    password_repeat: Joi.string()
        .equal(Joi.ref('password'))
        .required()
});

module.exports = schema;



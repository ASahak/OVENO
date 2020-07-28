let Joi = require('@hapi/joi');
const {
    ONLY_ENGLISH_LETTERS_WITH_DIGIT
} = require('../../utils');

const schema = Joi.object({
    name: Joi.string()
        .regex(new RegExp(ONLY_ENGLISH_LETTERS_WITH_DIGIT), 'Please input only english letters')
        .min(2)
        .max(255)
        .required(),
    category:Joi.string()
        .required(),
});

module.exports = schema;



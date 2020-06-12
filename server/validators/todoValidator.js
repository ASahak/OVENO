let Joi = require('@hapi/joi');
const JoiDate = require('@hapi/joi-date');
Joi = Joi.extend(JoiDate);

const schema = Joi.object({
    name: Joi.string()
        .regex(new RegExp(/^[\p{L}\s]*$/iu), 'Please write your name in format: John Doe')
        .min(3)
        .max(255)
        .required(),

    description: Joi.string()
        .max(1000)
        .required(),

    date: Joi.date()
        .format('YYYY-MM-DD')
        .required(),
});

module.exports = schema;



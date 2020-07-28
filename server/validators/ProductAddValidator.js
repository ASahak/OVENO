let Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(255)
        .required(),
    sale: Joi.number()
        .min(0)
        .required(),
    price: Joi.number()
        .min(0)
        .required(),
    photo: Joi.string()
        .required(),
    rating: Joi.array()
        .items(Joi.number())
        .required(),
    subCategory: Joi.string()
        .allow('').optional(),
    category: Joi.string()
        .required()
});

module.exports = schema;



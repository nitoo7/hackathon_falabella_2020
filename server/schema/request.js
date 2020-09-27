const Joi = require('joi');

const requestSchema = Joi.object({
    // count: Joi.number()
    // .integer()
    // .min(0)
    // .max(100),

    skuId: Joi.string()
    .alphanum()
    .required()
})

module.exports = {requestSchema}
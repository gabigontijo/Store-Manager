const Joi = require('joi');

const nameSchema = Joi.required();
const nameSchemaSize = Joi.string().min(5).required();
const saleKeySchema = Joi.required();
const saleQuantity = Joi.number().integer().min(1);

module.exports = {
  nameSchema,
  nameSchemaSize,
  saleKeySchema,
  saleQuantity,
};
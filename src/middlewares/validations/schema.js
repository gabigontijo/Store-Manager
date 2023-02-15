const Joi = require('joi');

const nameSchema = Joi.required();
const nameSchemaSize = Joi.string().min(5).required();

module.exports = {
  nameSchema,
  nameSchemaSize,
};
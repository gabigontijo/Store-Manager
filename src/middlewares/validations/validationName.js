const { nameSchema, nameSchemaSize } = require('./schema');

const validationName = (req, res, next) => {
  const { name } = req.body;
  const errorName = nameSchema.validate(name);
  const errorSize = nameSchemaSize.validate(name);
  console.log(errorSize);

  if (errorName.error) return res.status(400).json({ message: '"name" is required' });
  if (errorSize.error) {
 return res.status(422).json({
    message:
      '"name" length must be at least 5 characters long',
  });
  }
   return next();
};

module.exports = { validationName };
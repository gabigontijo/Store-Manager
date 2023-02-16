const { saleKeySchema, saleQuantity } = require('./schema');

const productRequired = (productId) => {
  const errorProductId = saleKeySchema.validate(productId);
  if (errorProductId.error) return true;
  return false;
};

const quantityRequired = (quantity) => {
  const errorQuantity = saleKeySchema.validate(quantity);
  const errorQuantityValue = saleQuantity.validate(quantity);
  if (errorQuantity.error) return { status: 400, message: '"quantity" is required' };
  if (errorQuantityValue.error) {
    return {
      status: 422,
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  return null;
};

const validationSale = (req, res, next) => {
  const product = req.body;
  for (let i = 0; i < product.length; i += 1) {
    if (productRequired(product[i].productId)) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    const quantityError = quantityRequired(product[i].quantity);
    if (quantityError) {
      return res.status(quantityError.status).json({ message: quantityError.message });
    }
  }
  return next();
};

module.exports = { validationSale };

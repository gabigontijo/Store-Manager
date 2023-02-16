const { salesModels } = require('../models');
const { validateProductId } = require('./validations/validationSalesService');

const insertProductSale = async (product) => {
  // try {
  const validate = await validateProductId(product);
  // console.log('================= VALIDATE:', validate);
  if (validate) {
    // console.log('================= SERVICE');

    const salesId = await salesModels.insertProduct(product);
    const result = {
      id: salesId,
      itemsSold:
        product,
    };

    return { type: null, message: result };
  }

  console.log('================= FAIL');
  return { type: 404, message: 'Product not found' };

  // } catch (err) {
    // return null;
};

module.exports = {
  insertProductSale,
};
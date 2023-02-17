const { salesModels } = require('../../models');

const validateProductId = async (product) => {
  const idList = product.map((item) => item.productId);
  const returnId = await salesModels.getProductsSaleId(idList);
  if (returnId.length === idList.length) {
    return true;
  }
  return false;
};

module.exports = { validateProductId };
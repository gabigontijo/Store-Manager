const { salesModels } = require('../models');

const insertProductSale = async (product) => {
    await Promise.all(product.map(async (item) => salesModels.insertProduct(item)));

  await salesModels.insertProduct(product);
  const lastSale = await salesModels.getAll();

   return { type: null, message: lastSale[lastSale.length - 1] };
};

module.exports = {
  insertProductSale,
};
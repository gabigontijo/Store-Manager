const { productsModels } = require('../models');

const getAllProducts = async () => {
  const allProducts = await productsModels.getAll();
  console.log(allProducts);

  return { type: null, message: allProducts };
};

const getProductById = async (id) => {
  const hasProduct = await productsModels.getById(id);
  if (!hasProduct.length) return { type: 404, message: 'Product not found' };

  return { type: null, message: hasProduct[0] };
};

const insertProduct = async (product) => {
  await productsModels.insertProduct(product);
  const productId = await productsModels.getAll();

   return { type: null, message: productId[productId.length - 1] };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
};
const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const allProducts = await productsModel.getAll();

  return { type: null, message: allProducts };
};

const getProductById = async (id) => {
  const hasProduct = await productsModel.getById(id);
  if (!hasProduct.length) return { type: 404, message: 'Product not found' };

  return { type: null, message: hasProduct[0] };
};

module.exports = {
  getAllProducts,
  getProductById,
};
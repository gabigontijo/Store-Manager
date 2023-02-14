const productsService = require('../services/products.service');

const getAllProducts = async (req, res) => {
  const { type, message } = await productsService.getAllProducts();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
const { type, message } = await productsService.getProductById(id);

  if (type) return res.status(type).json({ message: 'Product not found' });

  return res.status(200).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
};
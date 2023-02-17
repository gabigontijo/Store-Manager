const { productsServices } = require('../services');

const getAllProducts = async (req, res) => {
  const { type, message } = await productsServices.getAllProducts();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
const { type, message } = await productsServices.getProductById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const product = req.body;
  const { type, message } = await productsServices.insertProduct(product);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const { type, message } = await productsServices.updateById(+id, body);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsServices.remove(+id);
  if (type) return res.status(type).json({ message });

  return res.status(204).send();
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProductById,
  removeProduct,
};
const { salesServices } = require('../services');

const insertProductSale = async (req, res) => {
  const salesProducts = req.body;

  const { type, message } = await salesServices.insertProductSale(salesProducts);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  insertProductSale,
};
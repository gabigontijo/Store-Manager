const { salesServices } = require('../services');

const insertProductSale = async (req, res) => {
  const salesProducts = req.body;

  const { type, message } = await salesServices.insertProductSale(salesProducts);
  console.log('======================== insertProductSale: ', type, message);

  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const getAllSales = async (req, res) => {
  const { type, message } = await salesServices.getAllSales();

  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const getSaleByid = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.getSaleById(+id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const removeSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesServices.remove(+id);
  if (type) return res.status(type).json({ message });

  return res.status(204).send();
};

module.exports = {
  insertProductSale,
  getAllSales,
  getSaleByid,
  removeSale,
};
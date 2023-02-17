const camelize = require('camelize');
const { salesModels } = require('../models');
const { validateProductId } = require('./validations/validationSalesService');

const insertProductSale = async (product) => {
  const validate = await validateProductId(product);
  if (validate) {
    const salesId = await salesModels.insertProduct(product);
    const result = {
      id: salesId,
      itemsSold:
        product,
    };
    return { type: null, message: result };
  }
  return { type: 404, message: 'Product not found' };
};

const getAllSales = async () => {
  const salesList = await salesModels.getAllSales();
  return { type: null, message: camelize(salesList) };
};

const getSaleById = async (id) => {
  const saleList = await salesModels.getSaleById(id);
  console.log('saleslist----------------', saleList);
  if (saleList.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: camelize(saleList) };
};

const remove = async (id) => {
  const hasProduct = await salesModels.getSaleById(id);
  if (!hasProduct.length) return { type: 404, message: 'Sale not found' };

  await salesModels.remove(id);

  return { type: null, message: '' };
};

const updateBySaleId = async (id, body) => {
  const hasProduct = await salesModels.getSaleById(id);
  if (!hasProduct.length) return { type: 404, message: 'Sale not found' };
  const validate = await validateProductId(body);
  if (validate) {
    await salesModels.removeSaleProducts(id);
    const salesUptd = await salesModels.updateById(id, body);
    const result = {
      saleId: id,
      itemsUpdated: salesUptd,
    };
    return { type: null, message: result };
  }
 return { type: 404, message: 'Product not found' };
};

module.exports = {
  insertProductSale,
  getAllSales,
  getSaleById,
  remove,
  updateBySaleId,
};
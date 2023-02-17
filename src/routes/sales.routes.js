const express = require('express');
const { salesControllers } = require('../controllers');
const { validationSale } = require('../middlewares/validations/validationSale');

const saleRouter = express.Router();

saleRouter.post('/', validationSale, salesControllers.insertProductSale);
saleRouter.get('/:id', salesControllers.getSaleByid);
saleRouter.get('/', salesControllers.getAllSales);
saleRouter.delete('/:id', salesControllers.removeSale);
saleRouter.put('/:id', validationSale, salesControllers.updateSaleById);
module.exports = saleRouter;
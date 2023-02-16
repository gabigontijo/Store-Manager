const express = require('express');
const { salesControllers } = require('../controllers');
const { validationSale } = require('../middlewares/validations/validationSale');

const saleRouter = express.Router();

saleRouter.post('/', validationSale, salesControllers.insertProductSale);

module.exports = saleRouter;  
const express = require('express');
const { salesControllers } = require('../controllers');

const saleRouter = express.Router();

saleRouter.post('/', salesControllers.insertProductSale);

module.exports = saleRouter;
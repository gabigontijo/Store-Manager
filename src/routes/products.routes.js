const express = require('express');
const productsController = require('../controllers/products.controller');

const productRouter = express.Router();

productRouter.get('/', productsController.getAllProducts);
productRouter.get('/:id', productsController.getProductById);

module.exports = productRouter;
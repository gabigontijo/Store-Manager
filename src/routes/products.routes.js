const express = require('express');
const { productsControllers } = require('../controllers');

const productRouter = express.Router();

productRouter.get('/', productsControllers.getAllProducts);
productRouter.get('/:id', productsControllers.getProductById);

module.exports = productRouter; 
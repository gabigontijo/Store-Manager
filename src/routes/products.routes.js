const express = require('express');
const { productsControllers } = require('../controllers');

const productRouter = express.Router();

productRouter.get('/', productsControllers.getAllProducts);
productRouter.get('/:id', productsControllers.getProductById);
productRouter.post('/', productsControllers.insertProduct);

module.exports = productRouter;
const express = require('express');
const { productsControllers } = require('../controllers');
const { validationName } = require('../middlewares/validations/validationName');

const productRouter = express.Router();

productRouter.get('/', productsControllers.getAllProducts);
productRouter.get('/:id', productsControllers.getProductById);
productRouter.post('/', validationName, productsControllers.insertProduct);
productRouter.put('/:id', validationName, productsControllers.updateProductById);

module.exports = productRouter;
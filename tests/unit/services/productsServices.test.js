const { expect } = require('chai');
const sinon = require('sinon');
const { productsServices }  = require('../../../src/services')
const { productsModels } = require('../../../src/models');
const { allProducts, productId } = require('./mocks/productsServices.mock');

describe('Verificando service dos produtos', function () {
  describe('listagem dos produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productsModels, 'getAll').resolves(allProducts);


      // act
      const result = await productsServices.getAllProducts();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe('busca de um produto', function () {
    // it('retorna um erro caso receba um ID inválido', async function () {
    //   // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

    //   // act
    //   const result = await passengerService.findById('a');

    //   // assert
    //   expect(result.type).to.equal('INVALID_VALUE');
    //   expect(result.message).to.equal('"id" must be a number');
    // });

    it('retorna um erro caso o produto não exista', async function () {
      // arrange
      sinon.stub(productsModels, 'getById').resolves([]);

      // act
      const result = await productsServices.getProductById(5);

      // assert
      expect(result.type).to.equal(404);
      expect(result.message).to.equal('Product not found');
    });

    it('retorna a pessoa passageira caso ID existente', async function () {
      // arrange
      sinon.stub(productsModels, 'getById').resolves([productId]);

      // act
      const result = await productsServices.getProductById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productId);
    });
  });
  afterEach(function () {
     sinon.restore();
   });
   });

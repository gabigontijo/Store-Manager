const { expect } = require('chai');
const sinon = require('sinon');
const { productsServices }  = require('../../../src/services')
const { productsModels } = require('../../../src/models');
const { allProducts, productId, insertProduct, insertedProduct, getProduct } = require('./mocks/productsServices.mock');

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

    it('retorna o produto caso ID existente', async function () {
      // arrange
      sinon.stub(productsModels, 'getById').resolves([productId]);

      // act
      const result = await productsServices.getProductById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productId);
    });
  });

  describe('testa a função insertProducts Service', function () {
      it('Faz a inserção de um novo produto', async function () {
      const result = { type: null, message: insertedProduct }

      sinon.stub(productsModels, 'insertProduct').resolves(undefined);
      sinon.stub(productsModels, 'getAll').resolves(allProducts);

      const response = await productsServices.insertProduct(insertProduct);

      expect(response).to.be.deep.equal(result);
      });
  });
  describe('Testa a camada service para a função "updateById"', async function () {
    it('Faz a atualização de um produto pelo id', async function () {

      const expectUpdate = [{
        "id": 1,
        "name": "Martelo do Batman"
      }];

      const body = {
        "name": "Martelo do Batman"
      };
      const id = 1;
      const result = { type: null, message: expectUpdate[0] };

      sinon.stub(productsModels, 'getById').resolves([getProduct]);
      sinon.stub(productsModels, 'updateById').resolves(expectUpdate);

      const response = await productsServices.updateById(id, body);

      expect(response).to.be.deep.equal(result);
    });

    it('Tenta realizar a atualização de um produto com um id que não existe', async function () {
      const result = { type: 404, message: 'Product not found' };
        const body = {
        "name": "Martelo do Batman"
      };
      const id = 9999;

      sinon.stub(productsModels, 'getById').resolves([]);

      const responde = await productsServices.updateById(id, body);

      expect(responde).to.be.deep.equal(result);
    });
  });

  describe('Testa a camada service para a função "remove"', function () {
    it('Faz a remoção de um produto pelo id', async function () {
      const result = { type: null, message: '' };
      const id = 1;
      sinon.stub(productsModels, 'getById').resolves([getProduct]);
      sinon.stub(productsModels, 'remove').resolves(undefined);

      const response = await productsServices.remove(id);

      expect(response).to.be.deep.equal(result);
    });

    it('Tenta fazer a remoção de um produto com um id que não existe', async function () {
      const result = { type: 404, message: 'Product not found' };

      sinon.stub(productsModels, 'getById').resolves([]);

      const response = await productsServices.remove(999);

      expect(response).to.be.deep.equal(result);
    });
  });
  afterEach(function () {
     sinon.restore();
   });
   });

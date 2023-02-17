const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsServices } = require('../../../src/services');
const { productsControllers } = require('../../../src/controllers');
const { allProducts, productId, insertedProduct, insert } = require('./mocks/productsControllers.mock');

describe('Teste de unidade do productsController', function () {
  describe('Listando todos os produtos', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'getAllProducts')
        .resolves({ type: null, message: allProducts });

      await productsControllers.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
  });

  describe('Buscando um produto pelo id', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'getProductById')
        .resolves({ type: null, message: productId });

      await productsControllers.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productId);
    });

    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      const res = {};
      const req = {
        params: { id: 9999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsServices, 'getProductById')
        .resolves({ type: 404 , message: 'Product not found' });

      await productsControllers.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Testa a camada controller para a função "insertProduct"', function () {
    it('Faz a inserção de um novo produto', async function () {
      const req = { body: insert };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'insertProduct').resolves({ type: null, message: insertedProduct });

      await productsControllers.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(insertedProduct);
    });

    it('Tenta fazer a inserção de novo produto sem sucesso', async function () {
      const req = { body: insert };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'insertProduct').resolves({ type: 404, message: 'Product not found' });

      await productsControllers.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
    describe('Testa a camada controller para a função "updateProductById"', function () {
    it('Faz a atualização de um produto pelo id', async function () {
      const req = { params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const expectUpdate = {
      "id": 2,
      "name": "Martelo do Batman"
}

      sinon.stub(productsServices, 'updateById').resolves({ type: null, message: expectUpdate });

      await productsControllers.updateProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expectUpdate);
    });

    it('Testa fazer a atualização de uma pessoa pelo id sem sucesso', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'updateById').resolves({ type: 404, message: 'Essa pessoa não existe' });

      await productsControllers.updateProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Essa pessoa não existe' });
    });
  });


  describe('Testa a camada controller para a função "removeProduct"', function () {
    it('Faz a remoção de um produto pelo id com sucesso', async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      sinon.stub(productsServices, 'remove').resolves({ type: null, message: '' });

      await productsControllers.removeProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);

    });

    it('Faz a remoção de um porduto através do id inexistente', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'remove').resolves({ type: 404, message: 'Essa pessoa não existe' });

      await productsControllers.removeProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Essa pessoa não existe' });
    });
  });
  });
  describe('Testa a camada controller para a função "getProductSearch"', function () {
    it('Faz a busca de um produto pelo nome com resultado', async function () {
      const req = { query: { q: 'Martelo' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const search = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        }
      ]

      sinon.stub(productsServices, 'getSearch').resolves({ type: null, message: search });

      await productsControllers.getProductSearch(req, res);

      expect(res.status).to.have.been.calledWith(200);
       expect(res.json).to.have.been.calledWith(search);

    });

    it('Faz a busca de um produto pelo nome sem resultado e devolve todos os produtos', async function () {
      const req = { query: { q: 'Brasil' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
        const search = [
        {
          "id": 1,
          "name": "Martelo de Thor"
          },
        {
          "id": 2,
          "name": "Capa do Batman"
        }
      ]

      sinon.stub(productsServices, 'getSearch').resolves({ type: null, message: search });

      await productsControllers.getProductSearch(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(search);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
  });



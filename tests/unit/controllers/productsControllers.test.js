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
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'getAllProducts')
        .resolves({ type: null, message: allProducts });

      // act
      await productsControllers.getAllProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
  });

  describe('Buscando um produto pelo id', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'getProductById')
        .resolves({ type: null, message: productId });

      // Act
      await productsControllers.getProductById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productId);
    });

    // it('ao passar um id inválido deve retornar um erro', async function () {
    //   // Arrange
    //   const res = {};
    //   const req = {
    //     params: { id: 'abc' }, // passamos aqui um id inválido para forçar o erro esperado
    //   };

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();
    //   // Definimos o dublê do service retornando o contrato definido.
    //   sinon
    //     .stub(passengerService, 'findById')
    //     .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

    //   // Act
    //   await passengerController.getPassenger(req, res);

    //   // Assert
    //   // Avaliamos se chamou `res.status` com o valor 422
    //   expect(res.status).to.have.been.calledWith(422);
    //   // Avaliamos se chamou `res.status` com a mensagem esperada
    //   expect(res.json).to.have.been.calledWith('"id" must be a number');
    // });

    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 9999 }, // passamos aqui um id fictício para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido para esse cenário
      sinon
        .stub(productsServices, 'getProductById')
        .resolves({ type: 404 , message: 'Product not found' });

      // Act
      await productsControllers.getProductById(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 404
      expect(res.status).to.have.been.calledWith(404);
      // Avaliamos se chamou `res.status` com a mensagem esperada
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
  });
  afterEach(function () {
    sinon.restore();
  });
    });


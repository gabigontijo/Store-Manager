const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesServices } = require('../../../src/services');
const { salesControllers } = require('../../../src/controllers');
// const { allProducts, productId, insertedProduct, insert } = require('./mocks/productsControllers.mock');

describe('Teste de unidade do salesController', function () {
  describe('Testa a funçao getAllSales', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      const res = {};
      const req = {};
      const allSales = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }

      ];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'getAllSales')
        .resolves({ type: null, message: allSales });

      await salesControllers.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });
  });

  describe('Testa a função getSaleById', function () {
    it('deve responder com 200 e o sale', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };
      const saleById = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }

      ];
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'getSaleById')
        .resolves({ type: null, message: saleById });

      await salesControllers.getSaleByid(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleById);
    });
     });

  describe('Testa a função "insertProductSale"', function () {
    const insert = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];
    it('Faz a inserção de uma nova sale', async function () {
      const req = { body: insert };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const insertedSale = {
        "id": 3,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      };

      sinon.stub(salesServices, 'insertProductSale').resolves({ type: null, message: insertedSale });

      await salesControllers.insertProductSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(insertedSale);
    });

    it('Tenta fazer a inserção de novo produto sem sucesso', async function () {
      const req = { body: insert };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'insertProductSale').resolves({ type: 404, message: 'Product not found' });

      await salesControllers.insertProductSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
     });
    describe('Testa a camada controller para a função "updateSaleById"', function () {
    it('Faz a atualização de uma sale pelo id', async function () {
      const req = { params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const expectUpdate = {
        "saleId": 1,
        "itemsUpdated": [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
      };

      sinon.stub(salesServices, 'updateBySaleId').resolves({ type: null, message: expectUpdate });

      await salesControllers.updateSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expectUpdate);
    });

    it('Testa fazer a atualização de uma sale pelo id sem sucesso', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'updateBySaleId').resolves({ type: 404, message: 'Sale not found' });

      await salesControllers.updateSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('Testa a camada controller para a função "removeSale"', function () {
    it('Faz a remoção de uma sale pelo id com sucesso', async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      sinon.stub(salesServices, 'remove').resolves({ type: null, message: '' });

      await salesControllers.removeSale(req, res);

      expect(res.status).to.have.been.calledWith(204);

    });

    it('Faz a remoção de um porduto através do id inexistente', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'remove').resolves({ type: 404, message: 'Sale not found' });

      await salesControllers.removeSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
  });
const sinon = require('sinon');
const { expect } = require('chai');
const connection = require("../../../src/models/db/connection");
const { salesModels } = require('../../../src/models');
const { allProducts, productId } = require("./mocks/productsModels.mock");
const { date } = require('joi');


describe('Testes de unidade do model de sales', function () {
  describe('Testes a função model de sales getProductsSaleId', function () {
    it('Recuperando um produto por id da tabela products', async function () {
      sinon.stub(connection, 'execute').resolves(productId[0]);

      const result = await salesModels.getProductsSaleId(1);

      const expected =[
        {
          "id": 1,
        }
      ];

      expect(result).to.be.deep.equal(expected);
    });
  });
   describe('Testes a função model de sales insertProduct', function () {
     it('insere uma venda na tabela sales_product', async function () {
       const body = [
         {
           "productId": 1,
           "quantity": 1
         },
         {
           "productId": 2,
           "quantity": 5
         }
       ];
      sinon.stub(connection, 'query').resolves({});
      sinon.stub(connection, 'execute').resolves([{ insertId: 1, date: '2023-02-17 13:35:19' }]);


        const result = await salesModels.insertProduct(body);

        expect(result).to.be.deep.equal(1);
      });
   });
    describe('Testes a função model de sales getAllSales', function () {
      it('Trás a lista de todos as sales', async function () {

        const mockSalesList = [
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
          sinon.stub(connection, 'execute').resolves([mockSalesList]);

          const response = await salesModels.getAllSales();
          expect(response).to.be.equal(mockSalesList);
      });
    });
  describe('Testes a função model de sales getSaleById', function () {
      it('Trás a sale com o id passado', async function () {

        const mockSalesId = [
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

          sinon.stub(connection, 'execute').resolves([mockSalesId]);

          const response = await salesModels.getSaleById(1);
          expect(response).to.be.equal(mockSalesId);
      });
  });
  describe('Testa a camada model sales para a função "remove"', function () {
    it('Faz a remoção de um sale com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves(undefined);
      const id = 1;
      const response = await salesModels.remove(id);

      expect(response).to.be.equal(undefined);
    });
  });
    describe('Testa a camada model sales para a função "removeSaleProducts"', function () {
    it('Faz a remoção de um sale_produt com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves(undefined);
      const id = 1;
      const response = await salesModels.removeSaleProducts(id);

      expect(response).to.be.equal(undefined);
    });
  });
  describe('Testa a camada model sales para a função "updateById"', function () {
    it('Faz a atualização de uma sale pelo id', async function () {
      const body =
        [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ];
        const id = 1;
      sinon.stub(connection, 'execute').resolves(undefined);

      const response = await salesModels.updateById(id, body );
      expect(response).to.be.equal(body);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
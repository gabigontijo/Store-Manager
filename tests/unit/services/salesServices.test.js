const { expect } = require('chai');
const sinon = require('sinon');
const { salesServices }  = require('../../../src/services')
const { salesModels } = require('../../../src/models');
// const { allProducts, productId, insertProduct, insertedProduct, getProduct } = require('./mocks/productsServices.mock');

describe('Verificando service dos sales', function () {
  describe('Testa a função getAllSales', function () {
    it('retorna a lista completa de sales', async function () {
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

      sinon.stub(salesModels, 'getAllSales').resolves(allSales);

      const result = await salesServices.getAllSales();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales);
    });
  });

  describe('Testa a função getSaleById ', function () {
    it('retorna uma sale pelo id com sucesso', async function () {
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
      sinon.stub(salesModels, 'getSaleById').resolves(saleById);

      const result = await salesServices.getSaleById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(saleById);
    });
    });

  describe('testa a função insertProductSale ', function () {
    it('Faz a inserção de uma nova sale', async function () {
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
        const result = { type: null, message: insertedSale }
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


      sinon.stub(salesModels, 'insertProduct').resolves(3);
      sinon.stub(salesModels, 'getProductsSaleId').resolves([1,2]);

      const response = await salesServices.insertProductSale(body);

      expect(response).to.be.deep.equal(result);
    });
     it('Faz a inserção de uma nova sale com id inexistente', async function () {
         const result = { type: 404, message: 'Product not found' }
        const body = [
          {
            "productId": 10,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ];


      sinon.stub(salesModels, 'insertProduct').resolves(3);
      sinon.stub(salesModels, 'getProductsSaleId').resolves([]);

      const response = await salesServices.insertProductSale(body);

      expect(response).to.be.deep.equal(result);
      });
  });
  // describe('Testa a camada service para a função "updateById"', async function () {
  //   it('Faz a atualização de um produto pelo id', async function () {

  //     const expectUpdate = [{
  //       "id": 1,
  //       "name": "Martelo do Batman"
  //     }];

  //     const body = {
  //       "name": "Martelo do Batman"
  //     };
  //     const id = 1;
  //     const result = { type: null, message: expectUpdate[0] };

  //     sinon.stub(productsModels, 'getById').resolves([getProduct]);
  //     sinon.stub(productsModels, 'updateById').resolves(expectUpdate);

  //     const response = await productsServices.updateById(id, body);

  //     expect(response).to.be.deep.equal(result);
  //   });

  //   it('Tenta realizar a atualização de um produto com um id que não existe', async function () {
  //     const result = { type: 404, message: 'Product not found' };
  //       const body = {
  //       "name": "Martelo do Batman"
  //     };
  //     const id = 9999;

  //     sinon.stub(productsModels, 'getById').resolves([]);

  //     const responde = await productsServices.updateById(id, body);

  //     expect(responde).to.be.deep.equal(result);
  //   });
  // });

  describe('Testa a camada service para a função "remove"', function () {
    it('Faz a remoção de uma sale pelo id', async function () {
      const result = { type: null, message: '' };
      const id = 1;

      const sale = [
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
      sinon.stub(salesModels, 'getSaleById').resolves([sale]);
      sinon.stub(salesModels, 'remove').resolves(undefined);

      const response = await salesServices.remove(id);

      expect(response).to.be.deep.equal(result);
    });

    it('Tenta fazer a remoção de uma sale com um id que não existe', async function () {
      const result = { type: 404, message: 'Sale not found' };

      sinon.stub(salesModels, 'getSaleById').resolves([]);

      const response = await salesServices.remove(999);

      expect(response).to.be.deep.equal(result);
    });
  });

  afterEach(function () {
     sinon.restore();
   });
   });

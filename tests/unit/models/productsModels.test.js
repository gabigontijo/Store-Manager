const { expect } = require('chai');
const sinon = require('sinon');
const { productsModels } = require('../../../src/models');

const connection = require('../../../src/models/db/connection');
const { productId, allProducts, insertProduct } = require('./mocks/productsModels.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de todos os produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves(allProducts);
    // Act
    const result = await productsModels.getAll() ;
    // Assert
    const expected = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];
    expect(result).to.be.deep.equal(expected);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves(productId[0]);
    // Act
    const result = await productsModels.getById(1);
    // Assert

    const expected =
  {
    "id": 1,
    "name": "Martelo de Thor"
  };

     expect(result).to.be.deep.equal(expected);
  });
  it('Faz a inserção de um novo produto', async function () {
      sinon.stub(connection, 'execute').resolves();

      const response = await productsModels.insertProduct(insertProduct);
      expect(response).to.be.equal(undefined);
    });

  afterEach(function () {
    sinon.restore();
  });
});
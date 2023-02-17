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
  describe('Testa a camada model para a função "updateById"', function () {
    it('Faz a atualização de um produto pelo id', async function () {
      const expected =
       [{
         "id": 1,
         "name": "Martelo de Thor"
        }];
      sinon.stub(connection, 'execute').resolves([expected]);

      const id = 1;
      const body = { name: 'Martelo de Thor' }
      const response = await productsModels.updateById(id, body );
      expect(response).to.be.equal(expected);
    });
  });

  describe('Testa a camada model para a função "remove"', function () {
    it('Faz a remoção de um produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves(undefined);
      const id = 1;
      const response = await productsModels.remove(id);

      expect(response).to.be.equal(undefined);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
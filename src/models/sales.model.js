const connection = require('./db/connection');

const getProductsSaleId = async (idList) => {
  const [productId] = await connection.query(
    'SELECT id FROM StoreManager.products WHERE id IN (?)',
    [idList],
    (err) => {
      if (err) throw err;
    },
  );
  return productId;
};

const insertProduct = async (product) => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  const values = [];
  product.map(async (item) => {
    values.push([sale.insertId, item.productId, item.quantity]);
  });
  await connection.query(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?',
    [values],
    (err) => {
      if (err) throw err;
    },
  );
  return sale.insertId;
};

module.exports = {
  getProductsSaleId,
  insertProduct,
};

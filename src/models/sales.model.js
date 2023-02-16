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

const getAllSales = async () => {
   const [result] = await connection.execute(
     `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
     FROM StoreManager.sales_products AS sp
     LEFT JOIN StoreManager.sales AS s
     on sp.sale_id = s.id
     ORDER BY sp.sale_id, sp.product_id`,
  );
  return result;
};

const getSaleById = async (id) => {
 const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    LEFT JOIN StoreManager.sales AS s
    on sp.sale_id = s.id
    WHERE sp.sale_id = ?`,
    [id],
  );
  return result;
};

module.exports = {
  getProductsSaleId,
  insertProduct,
  getAllSales,
  getSaleById,
};

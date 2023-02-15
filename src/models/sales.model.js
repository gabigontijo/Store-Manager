const connection = require('./db/connection');

const insertProduct = async ({ productId, quantity }) => {
  // try {
  //   await connection.beginTransaction()
  //   const query1 = 'whatever'
  //   const result1 = await connection.query(query1)
  //   const query2 = 'something else'
  //   const result 2 = await connection.query(query2)
  //   /* etcetera etcetera */
  //   await connection.commit()
  // }
  // catch (error) {
  //   await connection.rollback()

  // }
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log('================= date: ', date);
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)',
    [date],
  );
  console.log('================= SALE: ', sale.insertId);
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
    [sale.insertId, productId, quantity],
  );
  console.log('================= RESULT: ', result);
};

module.exports = {
  insertProduct,
};
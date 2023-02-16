const connection = require('./db/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM  StoreManager.products WHERE id = (?)',
    [id],
  );
  return result;
};

const insertProduct = async ({ name }) => {
  await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
 );
};

const updateById = async (id, { name }) => connection.execute(
  'UPDATE StoreManager.products SET name = (?) WHERE id = (?)',
  [name, id],
);

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateById,
};
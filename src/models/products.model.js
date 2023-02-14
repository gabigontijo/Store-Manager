const connection = require('./db/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
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

module.exports = {
  getAll,
  getById,
};
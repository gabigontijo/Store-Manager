const { salesModels } = require('../../models');

const validateProductId = async (product) => {
  // const success = true;
  const idList = product.map((item) => item.productId);
  console.log('================= idlist', idList);
  const returnId = await salesModels.getProductsSaleId(idList);
  console.log('================= returnId', returnId);
  if (returnId.length === idList.length) {
    return true;
  }
  // await Promise.all(product.map(async (item) => {
  //   const list = await salesModels.getProductsSaleId(Number(item.productId));
  //   console.log('========== LIST:', list.length);
  //   if (list.length === 0) {
  //     console.log('========== FALSE');
  //     success = false;
  //   }
  // }));
//   console.log('========== SUCCESS:', success);
//   return success;
  return false;
};

module.exports = { validateProductId };
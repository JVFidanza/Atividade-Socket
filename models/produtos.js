// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('produtosLeilao').find().toArray();
  return result;
};

module.exports = {
  getAll,
};
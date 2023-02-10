const connection = require("../../config/mysql");

module.exports = {
  getAllMerchant: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM merchant WHERE namaResto LIKE '%${search}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${err.message}`));
          }
        }
      );
    }),
  getMerchantById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM merchant WHERE id = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),
    getMerchantAkunById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM merchant WHERE id_merchant = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          }
        }
      );
    }),
  getCountMerchant: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM merchant WHERE namaResto LIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${err.message}`));
          }
        }
      );
    }),
  postMerchant: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO merchant SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.message}`));
          }
        }
      );
      // eslint-disable-next-line no-console
      console.log(query.sql);
    }),
};

const connection = require("../../config/mysql");

module.exports = {
  getAllartikel: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM artikel WHERE nama LIKE '%${search}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
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
  getartikelById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM artikel WHERE id_merchant = ?",
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
  getCountartikel: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM artikel WHERE nama LIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${err.message}`));
          }
        }
      );
    }),
  postartikel: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO artikel SET ?",
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

const connection = require("../../config/mysql");

module.exports = {
  getAllMenu: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM menu WHERE nama LIKE '%${search}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
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
  getMenuById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM menu WHERE id_merchant = ?",
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
  getCountMenu: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM menu WHERE nama LIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${err.message}`));
          }
        }
      );
    }),
  postMenu: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO menu SET ?",
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

const connection = require("../../config/mysql");

module.exports = {
  getAllOrder: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM order_customer WHERE nama LIKE '%${search}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
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
  getOrderById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM order_customer WHERE id = ?",
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
  getCountOrder: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM order_customer WHERE nama LIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${err.message}`));
          }
        }
      );
    }),
  postOrder: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO order_customer SET ?",
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

const connection = require("../../config/mysql");

module.exports = {
  getAllOrganisasi: (limit, offset, search, sort) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM organisasi WHERE nama LIKE '%${search}%' ORDER BY ${sort} LIMIT ? OFFSET ?`,
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
  getOrganisasiById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM organisasi WHERE id = ?",
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
  getCountOrganisasi: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM organisasi WHERE nama LIKE '%${search}%'`,
        (err, result) => {
          if (!err) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${err.message}`));
          }
        }
      );
    }),
  postOrganisasi: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO organisasi SET ?",
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

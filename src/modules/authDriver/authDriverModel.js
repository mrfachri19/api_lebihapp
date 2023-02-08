const connection = require("../../config/mysql");

module.exports = {
  registerDriver: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO driver_data SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data,
          };
          delete newResult.password;
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getUserByPhone: (phone) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM driver_data WHERE phone = ?",
        phone,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL: ${error.sqlMessage}`));
          }
        }
      );
    }),
};

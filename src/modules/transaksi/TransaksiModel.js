const connection = require("../../config/mysql");

module.exports = {
  postTransaksi: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO transaksi SET ?",
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

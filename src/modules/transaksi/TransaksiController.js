/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const helperWrapper = require("../../helper/wrapper");
const transasksiModel = require("./TransaksiModel");

module.exports = {
  postTransaksi: async (req, res) => {
    try {
      const { nomor, payment, total } = req.body;
      const setData = {
        nomor,
        payment,
        total,
      };
      const result = await transasksiModel.postTransaksi(setData);
      return helperWrapper.response(res, 200, "Succes create data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
};

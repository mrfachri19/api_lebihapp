/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const helperWrapper = require("../../helper/wrapper");
const merchantModel = require("./merchantModel");

module.exports = {
    getAllMerchant: async (req, res) => {
      try {
        let { page, limit, search, sort } = req.query;
        page = Number(page) || 1;
        limit = Number(limit) || 10;
        search = search || "";
        sort = sort || "namaResto ASC";
        let offset = page * limit - limit;
        const totalData = await merchantModel.getCountMerchant(search);
        const totalPage = Math.ceil(totalData / limit);
        if (totalPage < page) {
          offset = 0;
          page = 1;
        }
        const pageInfo = {
          page,
          totalPage,
          limit,
          totalData,
        };

        const result = await merchantModel.getAllMerchant(
          limit,
          offset,
          search,
          sort
        );

        if (result.length < 1) {
          return helperWrapper.response(res, 200, `Data not found !`, []);
        }
        return helperWrapper.response(
          res,
          200,
          "Success get data",
          result,
          pageInfo
        );
      } catch (error) {
        return helperWrapper.response(
          res,
          400,
          `Bad request (${error.message})`,
          null
        );
      }
    },
    getMerchantById: async (req, res) => {
      try {
        const { id } = req.params;
        const result = await merchantModel.getMerchantById(id);
        if (result.length < 1) {
          return helperWrapper.response(
            res,
            404,
            `data by id ${id} not found !`,
            null
          );
        }
        return helperWrapper.response(res, 200, "succes get data by id", result);
      } catch (error) {
        return helperWrapper.response(
          res,
          400,
          `bad request (${error.message})`,
          null
        );
      }
    },
    getMerchantAkunById: async (req, res) => {
      try {
        const { id } = req.params;
        const result = await merchantModel.getMerchantAkunById(id);
        if (result.length < 1) {
          return helperWrapper.response(
            res,
            404,
            `data by id ${id} not found !`,
            null
          );
        }
        return helperWrapper.response(res, 200, "succes get data by id", result);
      } catch (error) {
        return helperWrapper.response(
          res,
          400,
          `bad request (${error.message})`,
          null
        );
      }
    },
  postMerchant: async (req, res) => {
    try {
      const { id_merchant, namaResto, alamat, phone, detailGedung, jamOprasi, kategori } =
        req.body;
      const setData = {
        id_merchant,
        namaResto,
        alamat,
        phone,
        detailGedung,
        jamOprasi,
        kategori,
      };
      const result = await merchantModel.postMerchant(setData);
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

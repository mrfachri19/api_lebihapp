/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const helperWrapper = require("../../helper/wrapper");
const menuModel = require("./menuModel");

module.exports = {
  getAllMenu: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "nama ASC";
      let offset = page * limit - limit;
      const totalData = await menuModel.getCountMenu(search);
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

      const result = await menuModel.getAllMenu(limit, offset, search, sort);

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
  getMenuById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await menuModel.getMenuById(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found !`,
          null
        );
      }
      return helperWrapper.response(res, 200, "succes get data by id merchant", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
  postMenu: async (req, res) => {
    try {
      const { id_merchant, nama, harga, diskon } = req.body;
      const setData = {
        id_merchant,
        nama,
        harga,
        diskon,
        image: req.file ? req.file.filename : null, 
      };
      const result = await menuModel.postMenu(setData);
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

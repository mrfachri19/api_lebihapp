/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const helperWrapper = require("../../helper/wrapper");
const SharingrecyleModel = require("./sharingrecyleModel");

module.exports = {
  getAllSharingrecyle: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "nama ASC";
      let offset = page * limit - limit;
      const totalData = await SharingrecyleModel.getCountSharingrecyle(search);
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

      const result = await SharingrecyleModel.getAllSharingrecyle(
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
  getSharingrecyleById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await SharingrecyleModel.getSharingrecyleById(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found !`,
          null
        );
      }
      return helperWrapper.response(
        res,
        200,
        "succes get data by id merchant",
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
  postSharingrecyle: async (req, res) => {
    try {
      const { nama, kategori, berat, total } = req.body;
      const setData = {
        nama,
        kategori,
        berat,
        total,
        image: req.file ? req.file.filename : null,
      };
      const result = await SharingrecyleModel.postSharingrecyle(setData);
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

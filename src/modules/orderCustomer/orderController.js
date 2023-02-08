/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const helperWrapper = require("../../helper/wrapper");
const orderModel = require("./orderModel");

module.exports = {
  getAllOrder: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      sort = sort || "nama ASC";
      let offset = page * limit - limit;
      const totalData = await orderModel.getCountOrder(search);
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

      const result = await orderModel.getAllOrder(limit, offset, search, sort);

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
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await orderModel.getOrderById(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found !`,
          null
        );
      }
      return helperWrapper.response(res, 200, "succes get data by id order", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request (${error.message})`,
        null
      );
    }
  },
  postOrder: async (req, res) => {
    try {
      const {
        alamat,
        nama,
        phone,
        building,
        harga,
        namaMakanan,
        jumlah,
        image
      } = req.body;
      const setData = {
        alamat,
        nama,
        phone,
        building,
        harga,
        namaMakanan,
        jumlah,
        image, 
      };
      const result = await orderModel.postOrder(setData);
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

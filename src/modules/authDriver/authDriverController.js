const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const helperWrapper = require("../../helper/wrapper");
const authDriverModel = require("./authDriverModel");
require("dotenv").config();

module.exports = {
  registerDriver: async (req, res) => {
    try {
      const { noKenderaan, phone, nama, password, idnumber } = req.body;

      // PROSES PENGECEKAN phone SUDAH PERNAH TERDAFTAR ATAU BLM DI DATABASE
      const checkUser = await authDriverModel.getUserByPhone(phone);
      if (checkUser.length > 0) {
        return helperWrapper.response(res, 409, `phone already used`, null);
      }

      // Proses Validasi input form
      if (phone.length < 1 || noKenderaan.length < 1 || nama.length < 1) {
        return helperWrapper.response(
          res,
          400,
          " input must be filled",
          null
        );
      }

      // PROSES ENCRYPT PASSWORD
      const hashPassword = await bcryptjs.hash(password, 10);

      const setData = {
        noKenderaan,
        phone,
        nama,
        idnumber,
        password: hashPassword,
        image: req.file ? req.file.filename : null, 
        role: "driver",
      };

      const result = await authDriverModel.registerDriver(setData);
      return helperWrapper.response(
        res,
        200,
        "Success register user",
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad Request, ${error.message}`,
        null
      );
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkPhone = await authDriverModel.getUserByPhone(email);
      console.log(checkPhone[0]);

      // Proses Validasi input form
      if (email.length < 1 || password.length < 1) {
        return helperWrapper.response(
          res,
          400,
          "All input must be filled",
          null
        );
      }

      const passwordUser = await bcryptjs.compare(
        password,
        checkPhone[0].password
      );
      if (!passwordUser) {
        return helperWrapper.response(res, 400, "Wrong password", null);
      }

      // PROSES UTAMA MEMBUAT TOKEN MENGGUNAKAN JWT (DATA YANG MAU DIUBAH, KATA KUNCI, LAMA TOKEN BISA DIGUNAKAN )
      const payload = checkPhone[0];
      delete payload.password;
      const token = jwt.sign({ ...payload }, "RAHASIA", {
        expiresIn: "24h",
      });
      // Add refresh token
      const refreshToken = jwt.sign({ ...payload }, "RAHASIA", {
        expiresIn: "72h",
      });
      console.log(payload)
      return helperWrapper.response(res, 200, "Success login", {
        id: payload.id,
        token,
        refreshToken,
        name: payload.nama,
        phone: payload.phone,
        noKenderaan:payload.noKenderaan,
        image:payload.image,
        role: payload.role,
      });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
};

const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const helperWrapper = require("../../helper/wrapper");
const authModel = require("./authModel.js");
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      const { name, phone, email, password, role } = req.body;

      // PROSES PENGECEKAN EMAIL SUDAH PERNAH TERDAFTAR ATAU BLM DI DATABASE
      const checkUser = await authModel.getUserByEmail(email);
      if (checkUser.length > 0) {
        return helperWrapper.response(res, 409, `Email already used`, null);
      }

      // Proses Validasi input form
      if (email.length < 1 || password.length < 1 || name.length < 1) {
        return helperWrapper.response(
          res,
          400,
          "All input must be filled",
          null
        );
      }

      // PROSES ENCRYPT PASSWORD
      const hashPassword = await bcryptjs.hash(password, 10);
      const setData = {
        name,
        phone,
        email,
        password: hashPassword,
        role,
      };

      const result = await authModel.register(setData);
      // await sendMail(setDataMail);
      return helperWrapper.response(
        res,
        200,
        "Success register user, please verify your email",
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
      const checkUser = await authModel.getUserByEmail(email);
      const checkPhone = await authModel.getUserByPhone(email);
      console.log(checkUser[0]);
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
        checkUser[0] ? checkUser[0].password : checkPhone[0].password
      );
      if (!passwordUser) {
        return helperWrapper.response(res, 400, "Wrong password", null);
      }

      // PROSES UTAMA MEMBUAT TOKEN MENGGUNAKAN JWT (DATA YANG MAU DIUBAH, KATA KUNCI, LAMA TOKEN BISA DIGUNAKAN )
      const payload = checkUser[0] ? checkUser[0] : checkPhone[0];
      delete payload.password;
      const token = jwt.sign({ ...payload }, "RAHASIA", {
        expiresIn: "24h",
      });
      // Add refresh token
      const refreshToken = jwt.sign({ ...payload }, "RAHASIA", {
        expiresIn: "72h",
      });
      return helperWrapper.response(res, 200, "Success login", {
        id: payload.id,
        token,
        refreshToken,
        name: payload.nama,
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

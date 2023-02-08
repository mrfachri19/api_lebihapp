const express = require("express");
const authDriverController = require("./authDriverController");
const middlewareUpload = require("../../middleware/upload");

const Router = express.Router();

Router.post(
  "/registerdriver",
  middlewareUpload,
  authDriverController.registerDriver
);
Router.post("/login-driver", authDriverController.login);

module.exports = Router;

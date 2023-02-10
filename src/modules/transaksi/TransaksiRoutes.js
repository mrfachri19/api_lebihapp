const express = require("express");

const Router = express.Router();
const TransaksiController = require("./TransaksiController");


Router.post("/", TransaksiController.postTransaksi);

module.exports = Router;

const express = require("express");

const Router = express.Router();

const merchantController = require("./merchantController");

Router.get("/", merchantController.getAllMerchant);
Router.get("/:id", merchantController.getMerchantById);
Router.post("/", merchantController.postMerchant);

module.exports = Router;

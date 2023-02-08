const express = require("express");

const Router = express.Router();
const orderController = require("./orderController");

Router.get("/", orderController.getAllOrder);
Router.get("/:id", orderController.getOrderById);
Router.post("/", orderController.postOrder);

module.exports = Router;

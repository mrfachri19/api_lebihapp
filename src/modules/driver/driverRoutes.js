const express = require("express");

const Router = express.Router();
const driverController = require("./driverController");

Router.get("/", driverController.getAllDriver);
Router.get("/:id", driverController.getDriverById);

module.exports = Router;

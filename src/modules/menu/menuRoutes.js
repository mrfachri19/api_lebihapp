const express = require("express");

const Router = express.Router();
const middlewareUpload = require("../../middleware/upload");
const MenuContreller = require("./menuController");

Router.get("/", MenuContreller.getAllMenu);
Router.get("/:id", MenuContreller.getMenuById);
Router.post("/", middlewareUpload, MenuContreller.postMenu);

module.exports = Router;

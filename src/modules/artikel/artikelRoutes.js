const express = require("express");

const Router = express.Router();
const middlewareUpload = require("../../middleware/upload");
const ArtikelController = require("./artikelController");

Router.get("/", ArtikelController.getAllArtikel);
Router.get("/:id", ArtikelController.getArtikelById);
Router.post("/", middlewareUpload, ArtikelController.postArtikel);

module.exports = Router;

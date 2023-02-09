const express = require("express");

const Router = express.Router();
const middlewareUpload = require("../../middleware/upload");
const organisasiController = require("./organisasiController");
const OrganisasiController = require("./organisasiController");

Router.get("/", OrganisasiController.getAllOrganisasi);
Router.get("/:id", OrganisasiController.getOrganisasiById);
Router.post("/", middlewareUpload, organisasiController.postOrganisasi);

module.exports = Router;

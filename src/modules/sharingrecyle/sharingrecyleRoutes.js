const express = require("express");

const Router = express.Router();
const middlewareUpload = require("../../middleware/upload");
const SharingrecyleContreller = require("./sharingrecyleController");

Router.get("/", SharingrecyleContreller.getAllSharingrecyle);
Router.get("/:id", SharingrecyleContreller.getSharingrecyleById);
Router.post("/", middlewareUpload, SharingrecyleContreller.postSharingrecyle);

module.exports = Router;

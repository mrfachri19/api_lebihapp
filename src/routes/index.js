const express = require("express");

const Router = express.Router();
const authRoutes  = require("../modules/auth/authRoutes");
const authDriverRoutes  = require("../modules/authDriver/authDriverRoutes");
const merchantRoutes  = require("../modules/merchant/merchantRoutes");
const menuRoutes  = require("../modules/menu/menuRoutes");
const orderRoutes  = require("../modules/orderCustomer/orderRoutes");
const organisasiRoutes  = require("../modules/organisasi/organisasiRoutes");
const driverRoutes  = require("../modules/driver/driverRoutes");
const ArtikelRoutes  = require("../modules/artikel/artikelRoutes");
const Sharingrecycle  = require("../modules/sharingrecyle/sharingrecyleRoutes");
const TransasksiRoutes  = require("../modules/transaksi/TransaksiRoutes");

Router.use("/auth", authRoutes);
Router.use("/authDriver", authDriverRoutes );
Router.use("/merchant", merchantRoutes );
Router.use("/menu", menuRoutes );
Router.use("/order", orderRoutes );
Router.use("/organisasi", organisasiRoutes );
Router.use("/driver", driverRoutes );
Router.use("/artikel", ArtikelRoutes );
Router.use("/food", Sharingrecycle );
Router.use("/transaksi", TransasksiRoutes );



module.exports = Router;

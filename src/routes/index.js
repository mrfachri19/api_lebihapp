const express = require("express");

const Router = express.Router();
const authRoutes  = require("../modules/auth/authRoutes");
const authDriverRoutes  = require("../modules/authDriver/authDriverRoutes");
const merchantRoutes  = require("../modules/merchant/merchantRoutes");
const menuRoutes  = require("../modules/menu/menuRoutes");
const orderRoutes  = require("../modules/orderCustomer/orderRoutes");

Router.use("/auth", authRoutes);
Router.use("/authDriver", authDriverRoutes );
Router.use("/merchant", merchantRoutes );
Router.use("/menu", menuRoutes );
Router.use("/order", orderRoutes );

module.exports = Router;
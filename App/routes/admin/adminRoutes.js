const express = require("express");
const loginAdmin = require("../../controller/admin/admincontroller");

const adminRouter = express.Router();
adminRouter.post("/adminlogin", loginAdmin);

module.exports = adminRouter;

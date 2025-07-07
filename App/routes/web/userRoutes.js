const express = require("express");
const {
  registerUser,
  loginUser,
  serviceBook,
  userDetails,
  // fetchMachines,
  // postMachine,

} = require("../../controller/web/userController");

const userRouter = express.Router(); // ✅ Only the router here

// Define your routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/services", serviceBook);
userRouter.get("/user/:id", userDetails);
// userRouter.get("/machines", fetchMachines);
// userRouter.post("/machines", postMachine);

module.exports = userRouter;

const express = require("express");
const { registerUser, loginUser, serviceBook, userDetails } = require("../../controller/web/userController");
const app = express();
app.use(express.json());



const userRouter = express.Router();


userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/services", serviceBook);
userRouter.get("/user/:id", userDetails);


module.exports = userRouter;
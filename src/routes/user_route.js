const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/user_controller");

userRouter.post("/user/register", userController.register);
userRouter.post("/user/login", userController.login);

module.exports = userRouter;

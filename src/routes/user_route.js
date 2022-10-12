const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/user_controller");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

module.exports = userRouter;

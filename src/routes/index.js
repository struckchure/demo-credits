const express = require("express");
const userRouter = require("./user_route");

const router = express.Router();

router.use("", userRouter);

module.exports = router;

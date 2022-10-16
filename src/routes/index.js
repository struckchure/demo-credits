const express = require("express");
const router = express.Router();

const userRouter = require("./user_route");
const walletRouter = require("./wallet_route");

router.use("", userRouter);
router.use("", walletRouter);

module.exports = router;

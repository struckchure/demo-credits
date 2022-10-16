const express = require("express");
const walletRouter = express.Router();

const WalletController = require("../controllers/wallet_controller");
const { authRequired } = require("../middlewares/auth_protect");

walletRouter.use(authRequired);

walletRouter.post("/wallet/", WalletController.createWallet);
walletRouter.get("/wallet/", WalletController.getWallet);
walletRouter.post("/wallet/fund", WalletController.fundWallet);
walletRouter.post("/wallet/transfer", WalletController.transferFromWallet);
walletRouter.post("/wallet/withdraw", WalletController.withdrawFromWallet);

module.exports = walletRouter;

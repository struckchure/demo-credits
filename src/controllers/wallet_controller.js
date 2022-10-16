const walletService = require("../services/wallet_service");

class WalletController {
  // POST /wallet/
  async createWallet(req, res) {
    try {
      const userId = req.user.id;
      const wallet = await walletService.createWallet(userId);
      res.status(201).json({ data: wallet });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  }

  // GET /wallet/
  async getWallet(req, res) {
    try {
      const wallet = await walletService.getWallet({ user: req.user.id });
      res.status(200).json({ data: wallet });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  }

  // POST /wallet/fund/
  async fundWallet(req, res) {
    try {
      const { amount } = req.body;
      const { id: walletID } = await walletService.getWallet({
        user: req.user.id,
      });
      const wallet = await walletService.fundWallet(walletID, amount);
      res.status(200).json({ data: wallet });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  }

  // POST /wallet/transfer/
  async transferFromWallet(req, res) {
    try {
      const { username: recieverUsername, amount } = req.body;
      const { username: senderUsername } = req.user;

      const wallet = await walletService.transferFromWallet(
        { senderUsername, recieverUsername },
        amount
      );
      res.status(200).json({ data: wallet });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  }

  // POST /wallet/withdraw/
  async withdrawFromWallet(req, res) {
    try {
      const { amount } = req.body;
      const { id: userID } = req.user;

      const wallet = await walletService.withdrawFromWallet({ userID }, amount);
      res.status(200).json({ data: wallet });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  }
}

module.exports = new WalletController();

const walletDAO = require("../dao/wallet_dao");
const transactionDAO = require("../dao/transaction_dao");

class WalletService {
  async createWallet(userId) {
    return await walletDAO.createWallet(userId);
  }

  async getWallet(filterParams) {
    return await walletDAO.getWallet(filterParams);
  }

  async fundWallet(walletID, amount) {
    return await walletDAO.getWallet({ id: walletID }).then(async (wallet) => {
      const transaction = await transactionDAO.createTransaction({
        wallet: walletID,
        amount,
        type: "CREDIT",
      });

      const newBalance = wallet.balance + transaction.value;
      return await walletDAO.updateWallet(walletID, { balance: newBalance });
    });
  }

  async transferFromWallet({ senderUsername, recieverUsername }, value) {
    const [senderWalletID, recieverWalletID] = await Promise.all([
      walletDAO
        .getWallet({ username: senderUsername })
        .then((wallet) => wallet.id),
      walletDAO
        .getWallet({ username: recieverUsername })
        .then((wallet) => wallet.id),
    ]);

    // withdraw from sender
    await this.withdrawFromWallet({ walletID: senderWalletID }, value);

    // create credit transaction for reciever
    await transactionDAO.createTransaction({
      wallet: recieverWalletID,
      value,
      type: "CREDIT",
    });

    return await walletDAO.getWallet({ id: senderWalletID });
  }

  async withdrawFromWallet({ userID }, value) {
    const senderWallet = await walletDAO.getWallet({ user: userID });

    // check if sender has enough balance
    if (senderWallet.balance < value) {
      throw new Error("Insufficient funds");
    }

    // create debit transaction for sender
    await transactionDAO.createTransaction({
      wallet: senderWallet.id,
      value,
      type: "DEBIT",
    });

    return await walletDAO.getWallet({ id: senderWallet.id });
  }
}

module.exports = new WalletService();

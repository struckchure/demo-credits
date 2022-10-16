const db = require("../db");
const walletDAO = require("../dao/wallet_dao");

class TransactionDAO {
  async createTransaction(transactionData) {
    return await db("transactions")
      .insert(transactionData)
      .then(async (ids) => {
        const wallet = await walletDAO.getWallet({
          id: transactionData.wallet,
        });

        // update wallet balance if DEBIT/CREDIT
        if (transactionData.type === "DEBIT") {
          await walletDAO.updateWallet(wallet.id, {
            balance: wallet.balance - transactionData.value,
          });
        } else if (transactionData.type === "CREDIT") {
          await walletDAO.updateWallet(wallet.id, {
            balance: wallet.balance + transactionData.value,
          });
        }

        return this.getTransaction(ids[0]);
      });
  }

  async getTransaction(transactionId) {
    return await db("transactions").where({ id: transactionId }).first();
  }
}

module.exports = new TransactionDAO();

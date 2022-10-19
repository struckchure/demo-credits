const db = require("../db");

class WalletDAO {
  async createWallet(userId) {
    return await db("wallets")
      .insert({
        user: userId,
      })
      .then((ids) => {
        return this.getWallet({ id: ids[0] });
      });
  }

  async getWallet(filterParams) {
    const wallet = await db("wallets").where(filterParams).first();

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    return wallet;
  }

  async updateWallet(walletID, wallet) {
    return await db("wallets")
      .where({ id: walletID })
      .update(wallet)
      .then((_) => {
        return this.getWallet({ id: walletID });
      });
  }
}

module.exports = new WalletDAO();

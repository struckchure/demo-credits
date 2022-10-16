const db = require("../db");

class UserDAO {
  async createUser(userData) {
    return await db("users")
      .insert(userData)
      .then((ids) => this.getUser({ id: ids[0] }));
  }

  async getUser(userFilter, showPassword = false) {
    const columns = [
      "id",
      "username",
      "token",
      "created_at",
      "updated_at",
      showPassword ? "password" : null,
    ].filter((c) => c !== null);

    return await db("users").select(columns).where(userFilter).first();
  }
}

module.exports = new UserDAO();

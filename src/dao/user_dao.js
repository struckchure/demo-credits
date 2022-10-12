const db = require("../db");

class UserDAO {
  async createUser({ firstName, lastName, username, password, token }) {
    return await db("users")
      .insert({
        first_name: firstName,
        last_name: lastName,
        username,
        password,
        token,
      })
      .then((ids) => {
        return this.getUser({ id: ids[0] });
      });
  }

  getUser(userFilter, showPassword = false) {
    const columns = [
      "first_name",
      "last_name",
      "username",
      "token",
      "created_at",
      "updated_at",
      showPassword ? "password" : null,
    ].filter((c) => c !== null);

    return db("users").select(columns).where(userFilter).first();
  }

  updateUser(userFilter, user) {
    return db("users")
      .where(userFilter)
      .update(user)
      .then((_) => {
        return this.getUser(userFilter);
      });
  }
}

module.exports = new UserDAO();

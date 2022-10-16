const bcrypt = require("bcryptjs");
const userDAO = require("../dao/user_dao");
var randomToken = require("random-token");

const SALT_ROUNDS = 10;
const TOKEN_LENGTH = 20;

class UserService {
  async createUser({ username, password }) {
    const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return await userDAO.createUser({
      username,
      password: encryptedPassword,
      token: randomToken(TOKEN_LENGTH),
    });
  }

  async getUser(userFilter) {
    const user = await userDAO.getUser(userFilter);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async authenticateUser({ username, password }) {
    const user = await userDAO.getUser({ username }, true);
    if (!user) {
      throw new Error("User not found");
    }

    if (bcrypt.compareSync(password, user.password)) {
      return await userDAO.updateUser(
        { username },
        { token: randomToken(TOKEN_LENGTH) }
      );
    } else {
      throw new Error("Invalid password");
    }
  }
}

module.exports = new UserService();

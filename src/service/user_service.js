const bcrypt = require("bcryptjs");
const userDAO = require("../dao/user_dao");
var randomToken = require("random-token");

const SALT_ROUNDS = 10;
const TOKEN_LENGTH = 20;

class UserService {
  async createUser({ firstName, lastName, username, password }) {
    const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return await userDAO.createUser({
      firstName,
      lastName,
      username,
      password: encryptedPassword,
      token: randomToken(TOKEN_LENGTH),
    });
  }

  async getUser(userFilter) {
    return await userDAO.getUser(userFilter);
  }

  async authenticateUser({ username, password }) {
    const user = await userDAO.getUser({ username }, true);
    if (!user) return null;

    if (bcrypt.compareSync(password, user.password)) {
      return await userDAO.updateUser(
        { username },
        { token: randomToken(TOKEN_LENGTH) }
      );
    } else return null;
  }
}

module.exports = new UserService();

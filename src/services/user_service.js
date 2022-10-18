const bcrypt = require("bcryptjs");
const userDAO = require("../dao/user_dao");
var randomToken = require("random-token");

const SALT_ROUNDS = 10;
const TOKEN_LENGTH = 20;

class UserService {
  validateUserData({ username, password }) {
    if (!username) throw new Error("username is required");
    if (!password) throw new Error("password is required");

    return {
      username,
      password,
    };
  }

  async checkUserExists(userFilter) {
    const user = await userDAO.getUser(userFilter);
    if (user) throw new Error("user already exists");
  }

  async createUser({ username, password }) {
    const value = this.validateUserData({
      username,
      password,
    });

    await this.checkUserExists({ username });

    const encryptedPassword = await bcrypt.hash(value.password, SALT_ROUNDS);

    const user = await userDAO
      .createUser({
        username: value.username,
        password: encryptedPassword,
        token: randomToken(TOKEN_LENGTH),
      })
      .then((user) => user);

    return user;
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

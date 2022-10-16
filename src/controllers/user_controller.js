const userService = require("../services/user_service");

class UserController {
  // POST /user/register
  async register(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ data: user });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  }

  // POST /user/login
  async login(req, res) {
    try {
      const user = await userService.authenticateUser(req.body);
      if (user) {
        res.status(200).json({ data: user });
      } else {
        res
          .status(400)
          .json({ data: null, error: "Invalid username or password" });
      }
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  }
}

module.exports = new UserController();

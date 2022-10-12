const userDAO = require("../dao/user_dao");

async function auth_required(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      message: "Access token is missing",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    let user = await userDAO({
      token,
    });

    if (!user) {
      return res.status(403).json({
        error: "Invalid token",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({
      data: null,
      error: "Authentication error",
    });
  }
}

async function auth_required_or_read_only(req, next) {
  const SAFE_METHODS = ["GET", "OPTIONS"];

  if (SAFE_METHODS.includes(req.method)) {
    next();
  }
}

module.exports = {
  auth_required,
  auth_required_or_read_only,
};

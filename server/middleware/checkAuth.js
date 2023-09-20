const jwt = require("jsonwebtoken");

const httpError = require("../models/http-Error");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication Failed");
    }
    const decodedToken = jwt.verify(token, "secret2key8for0app9");
    req.userData = { userId: decodedToken };
  } catch (err) {
    const error = new httpError('Something went wrong', 500);
    return next(error);
  }
};

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpError = require("../models/http-Error");

const jwtSecret = process.env.SECRET;
const getUserDataFromReq = async (req, res, next) => {
  try {
    const userData = await jwt.verify(req.cookies.token, jwtSecret, {});
    return userData;
  } catch (err) {
    const error = new httpError("Something went wrong", 500);
    return next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const bcryptSalt = bcrypt.genSaltSync(10);
    // const jwtSecret = "secret2key8for0app9";

    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (e) {
    const error = new httpError(e.message, 422);
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);

      if (passOk) {
        const token = jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
          },
          jwtSecret,
          {}
        );
        // console.log(token);

        res.cookie("token", token).json(userDoc);
      } else {
        res.status(422).json("Password is incorrect");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
  }
};

const profile = async (req, res,next) => {
  try {
    const { token } = req.cookies;

    if (token) {
      const userData = await getUserDataFromReq(req);
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    } else {
      res.json(null);
    }
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
  }
};

const logout = (req, res) => {
  res.cookie("token", "").json(true);
};

module.exports = {
  register,
  login,
  profile,
  logout,
};

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpError = require("../models/http-Error");

const jwtSecret = process.env.SECRET;
// const getUserDataFromReq = async (req, res, next) => {
//   try {
//     const userData = jwt.verify(req.cookies.token, jwtSecret, {});
//     return userData;
//   } catch (err) {
//     const error = new httpError("Something went wrong", 500);
//     return next(error);
//   }
// };

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new httpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new httpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new httpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const newUser = User.create({
    name,
    email,
    password: hashedPassword,
  });

  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      jwtSecret,
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    const error = new httpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({
      userId: newUser._id,
      email: newUser.email,
      token: token,
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new httpError(
      "Loggin in Failed, Please try again later",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new httpError("Invalid Credentials", 403);
    return next(error);
  }

  let isValidPass = false;
  try {
    isValidPass = bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new httpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPass) {
    const error = new httpError("Invalid credentials!", 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "secret2key8for0app9",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new httpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

const profile = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const error = new httpError("Authorization Failed!", 401);
    return next(error);
  }

  let user;
  try {
    const decoded = await jwt.verify(token, jwtSecret);

    user = await User.findById(decoded.userId);

    if (!user) {
      const error = new httpError("User not found", 404);
      return next(error);
    }
  } catch (err) {
    const error = new httpError("Token is not valid", 401);
    return next(error);
  }
  return res.json({ user });
};

module.exports = {
  register,
  login,
  profile,
};

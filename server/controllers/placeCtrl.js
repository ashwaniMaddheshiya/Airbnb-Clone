const jwt = require("jsonwebtoken");

const Place = require("../models/Place");
const httpError = require("../models/http-Error");

const jwtSecret = process.env.SECRET;

const newPlace = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(req.files);
    const {
      title,
      address,
      description,
      price,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;

    const userData = await new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) reject(err);
        resolve(userData);
      });
    });
    // console.log("userData", userData);

    const imagePaths = req.files.map((file) => file.path);
    // console.log(imagePaths)

    const placeDoc = await Place.create({
      owner: userData.id,
      price,
      title,
      address,
      image: imagePaths,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });

    res.json(placeDoc);
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
    // throw err;
  }
};

const getPlaces = async (req, res, next) => {
  try {
    res.json(await Place.find());
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
  }
};

const placeDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const place = await Place.findById(id);
    res.json(place);
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
  }
};

const updatePlace = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { id } = req.params;

    const {
      title,
      address,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    const userData = await new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) reject(err);
        resolve(userData);
      });
    });

    const placeDoc = await Place.findById(id);

    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });

      if (req.files && req.files.length > 0) {
        const imagePaths = req.files.map((file) => file.path);
        placeDoc.image = imagePaths;
      }

      await placeDoc.save();
      res.json("ok");
    } else {
      res.status(403).json("Unauthorized");
    }
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
  }
};

const getUserPlace = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const userData = await new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) reject(err);
        resolve(userData);
      });
    });

    const { id } = userData;
    const places = await Place.find({ owner: id });

    res.json(places);
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
  }
};

module.exports = {
  newPlace,
  getPlaces,
  placeDetails,
  updatePlace,
  getUserPlace,
};

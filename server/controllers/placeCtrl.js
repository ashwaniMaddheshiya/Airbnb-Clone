const jwt = require("jsonwebtoken");

const Place = require("../models/Place");
const httpError = require("../models/http-Error");

const jwtSecret = process.env.SECRET;

const newPlace = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
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

    const userData = await jwt.verify(token, jwtSecret, {});

    const imagePaths = req.files.map((file) => file.path);

    const placeDoc = await Place.create({
      owner: userData.userId,
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
  const { userId } = req.params;
  try {
    const place = await Place.findById(userId);
    res.json(place);
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
  }
};

const updatePlace = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { userId } = req.params;

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

    const userData = await jwt.verify(token, jwtSecret, {});

    const placeDoc = await Place.findById(userId);

    if (userData.userId === placeDoc.owner.toString()) {
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
    const token = req.headers.authorization;

    const userData = await jwt.verify(token, jwtSecret, {});

    const { userId } = userData;
    const places = await Place.find({ owner: userId });

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

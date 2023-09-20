const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");
const httpError = require("../models/http-Error");

const jwtSecret = process.env.SECRET;

const newBooking = async (req, res, next) => {
  try {
    const token = req.headers.authorization; // Get the token from headers

    if (!token) {
      const error = new httpError("No token, authorization denied", 401);
      return next(error);
    }

    // Use async/await to verify the token and get userData
    const userData = await jwt.verify(token, jwtSecret);

    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;

    const doc = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userData.userId,
    });

    res.json(doc);
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
  }
};

const getBooking = async (req, res, next) => {
  try {
    const token = req.headers.authorization; // Get the token from headers

    if (!token) {
      const error = new httpError("No token, authorization denied", 401);
      return next(error);
    }

    // Use async/await to verify the token and get userData
    const userData = await jwt.verify(token, jwtSecret);

    // Use userData.id to query the database
    const bookings = await Booking.find({ user: userData.userId }).populate(
      "place"
    );

    res.json(bookings);
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
  }
};

const getBookingDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      const error = new httpError("No token, authorization denied", 401);
      return next(error);
    }

    const userData = await jwt.verify(token, jwtSecret);

    const bookingDetail = await Booking.findById(id).populate("place");
    res.json(bookingDetail);
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
  }
};

module.exports = {
  newBooking,
  getBooking,
  getBookingDetail,
};

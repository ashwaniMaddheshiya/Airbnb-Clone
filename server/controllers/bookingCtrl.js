const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.SECRET;

const newBooking = async (req, res,next) => {
  const { token } = req.cookies;
  try {
    const userData = await new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) reject(err);
        resolve(userData);
      });
    });
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
      user: userData.id,
    });

    res.json(doc);
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
  }
};

const getBooking = async (req, res,next) => {
  const { token } = req.cookies;
  try {
    const userData = await new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) reject(err);
        resolve(userData);
      });
    });
    const bookings = await Booking.find({ user: userData.id }).populate(
      "place"
    );
    res.json(bookings);
  } catch (err) {
    const error = new httpError(err.message, 500);
    return next(error);
  }
};

module.exports = {
  newBooking,
  getBooking,
};

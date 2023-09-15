const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  address: { type: String },
  image: { type: Array },
  description: { type: String },
  perks: { type: String },
  extraInfo: { type: String },
  checkIn: { type: String },
  checkOut: { type: String },
  maxGuests: { type: String },
  price: { type: String },
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;

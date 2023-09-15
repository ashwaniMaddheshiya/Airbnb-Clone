const express = require("express");
const router = express.Router();

const { newBooking, getBooking } = require("../controllers/bookingCtrl");

router.post("/", newBooking);
router.get("/", getBooking);

module.exports = router;

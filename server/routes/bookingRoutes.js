const express = require("express");
const router = express.Router();

const { newBooking, getBooking, getBookingDetail } = require("../controllers/bookingCtrl");

router.post("/", newBooking);
router.get("/", getBooking);
router.get("/:id", getBookingDetail);

module.exports = router;

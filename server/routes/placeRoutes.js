const express = require("express");
const router = express.Router();

const fileUpload = require("../middleware/fileUpload");

const {
  newPlace,
  getUserPlace,
  getPlaces,
  placeDetails,
  updatePlace,
} = require("../controllers/placeCtrl");

router.post("/", fileUpload.array("image", 10), newPlace);
router.get("/", getPlaces);
router.get("/user-places", getUserPlace);
router.get("/:id", placeDetails);
router.put("/:id", fileUpload.array("image", 10), updatePlace);

module.exports = router;

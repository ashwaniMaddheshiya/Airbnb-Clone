const express = require("express");
const router = express.Router();

const { register, login, profile, logout } = require("../controllers/userCtrl");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);

module.exports = router;

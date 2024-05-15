const express = require("express");
const router = express.Router();

const { loginUser, registerUser } = require("../controllers/UserController");

// Login route
router.post("/login", loginUser);

// Sign Up route
router.post("/register", registerUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Register
router.get("/register", authController.registerForm);
router.post("/register", authController.register);

// Login
router.get("/login", authController.loginForm);
router.post("/login", authController.login);

// Logout (GET và POST)
router.get("/logout", authController.logout);
router.post("/logout", authController.logout);

// Profile
router.get("/profile", authController.profile);

module.exports = router;

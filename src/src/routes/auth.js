const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required"
    });
  }

  // TEMP DUMMY LOGIN (real DB later)
  if (email === "admin@mslogistic.com" && password === "123456") {
    return res.json({
      success: true,
      message: "Login successful",
      token: "dummy-jwt-token"
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

module.exports = router;

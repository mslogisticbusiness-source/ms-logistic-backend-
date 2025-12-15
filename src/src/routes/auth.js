const express = require("express");
const router = express.Router();

// TEMP LOGIN (for testing)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // TEST CREDENTIALS
  if (email === "admin@mslogistic.com" && password === "123456") {
    return res.json({
      token: "dummy-jwt-token",
      user: {
        email,
        role: "admin"
      }
    });
  }

  return res.status(401).json({
    message: "Invalid email or password"
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();

const USERS = []; // temporary in-memory users

// REGISTER
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  const exists = USERS.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  USERS.push({ email, password });
  res.json({ message: "User registered successfully" });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = USERS.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    message: "Login successful",
    token: "demo-token-123"
  });
});

module.exports = router;

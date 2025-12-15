const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const authRoutes = require("./src/routes/auth");
app.use("/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("MS Logistic Backend Running");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

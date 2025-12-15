const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ROUTES
const authRoutes = require("./src/src/routes/auth");
app.use("/auth", authRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("MS Logistic Backend Running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

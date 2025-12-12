const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("MS Logistic Backend Running");
});

// IMPORTANT: Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

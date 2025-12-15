const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

/* =======================
   Middlewares
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   Routes Import
======================= */
const authRoutes = require("./src/src/routes/auth");
const bharatRoutes = require("./src/src/routes/bharat");
const nimbusRoutes = require("./src/src/routes/nimbus");

/* =======================
   Routes Use
======================= */
app.get("/", (req, res) => {
  res.send("MS Logistic Backend Running");
});

app.use("/auth", authRoutes);
app.use("/bharat", bharatRoutes);
app.use("/nimbus", nimbusRoutes);

/* =======================
   Start Server
======================= */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

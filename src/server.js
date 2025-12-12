import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { loginBharatship, loginNimbus } from "./auth.js";
import { createOrder } from "./courier.js";

const app = express();
app.use(cors());
app.use(express.json());

// TEST route
app.get("/", (req, res) => {
  res.send("MS Logistic Backend Running ✔️");
});

// Bharatship Login
app.post("/login/bharatship", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await loginBharatship(email, password);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Bharatship Login Failed" });
  }
});

// Nimbus Login
app.post("/login/nimbus", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await loginNimbus(email, password);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Nimbus Login Failed" });
  }
});

// Create Order (Multi-courier)
app.post("/order/create", async (req, res) => {
  try {
    const result = await createOrder(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Order Creation Failed" });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

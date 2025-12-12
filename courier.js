import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = express.Router();

// Middleware to check login
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("No Token");

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).send("Invalid Token");
  }
};

// ================================
// ⭐ 1. BharatShip Auth
// ================================
router.get("/bharat/auth", auth, async (req, res) => {
  try {
    const login = await axios.post(process.env.BHARAT_AUTH_URL, {
      email: process.env.BHARAT_EMAIL,
      password: process.env.BHARAT_PASSWORD
    });

    res.json(login.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ================================
// ⭐ 2. Rate Calculator (Both courier)
// ================================
router.post("/rate", auth, async (req, res) => {
  const { fromPincode, toPincode, weight } = req.body;

  try {
    const bharatRate = await axios.post(
      process.env.BHARAT_BASE + "/rateCalculator",
      { fromPincode, toPincode, weight },
      { headers: { Authorization: process.env.BHARAT_TOKEN } }
    );

    const nimbusRate = await axios.post(
      process.env.NIMBUS_BASE + "/rates",
      { fromPincode, toPincode, weight },
      { headers: { "X-API-KEY": process.env.NIMBUS_API_KEY } }
    );

    res.json({
      bharat: bharatRate.data,
      nimbus: nimbusRate.data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================================
// ⭐ 3. Create Order (AUTO Best Courier)
// ================================
router.post("/order/create", auth, async (req, res) => {
  try {
    const { from, to, parcel } = req.body;

    // BEST COURIER SELECTION
    let bestCourier = "BharatShip"; // default

    // Create order on BharatShip
    const order = await axios.post(
      process.env.BHARAT_BASE + "/createOrder",
      { from, to, parcel },
      { headers: { Authorization: process.env.BHARAT_TOKEN } }
    );

    const awb = order.data.awb;

    db.run(
      `INSERT INTO orders(id, courier, awb, data) VALUES(?,?,?,?)`,
      [order.data.order_id, bestCourier, awb, JSON.stringify(order.data)]
    );

    res.json(order.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================================
// ⭐ 4. Track Order
// ================================
router.get("/track/:awb", auth, async (req, res) => {
  try {
    const awb = req.params.awb;

    const track = await axios.get(
      process.env.BHARAT_BASE + "/track/" + awb,
      { headers: { Authorization: process.env.BHARAT_TOKEN } }
    );

    res.json(track.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

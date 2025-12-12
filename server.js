import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import courierRoutes from "./src/routes/courier.js";
import authRoutes from "./src/routes/auth.js";
import { initDB } from "./src/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// initialize DB
initDB();

app.use("/api/auth", authRoutes);
app.use("/api/courier", courierRoutes);

app.get("/", (req, res) => {
  res.send("MS Logistics Backend Running ✔");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

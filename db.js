import sqlite3 from "sqlite3";
sqlite3.verbose();

export const db = new sqlite3.Database("./data/mslogistics.db");

export const initDB = () => {
  db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders(
    id TEXT,
    courier TEXT,
    awb TEXT,
    data TEXT
  )`);

  console.log("Database initialized ✔");
};

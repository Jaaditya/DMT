require("dotenv").config();
const { Client } = require("pg");

const conn = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

(async () => {
  try {
    await conn.connect();
    console.log("Connected to PostgreSQL");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); 
  }
})();

module.exports = conn;

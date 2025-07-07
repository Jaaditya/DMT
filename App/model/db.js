require("dotenv").config();
const { Client } = require("pg");

// const conn = new Client({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   port: process.env.DB_PORT,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

require('dotenv').config(); // for local use
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});


(async () => {
  try {
    await conn.connect();
    console.log("✅ Connected to PostgreSQL");
  } catch (err) {
    console.error("❌ Database connection failed:", err); // not just err.message
    process.exit(1);
  }
})();

module.exports = conn;

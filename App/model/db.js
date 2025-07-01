require("dotenv").config();
const { Client } = require("pg");

const conn = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.NAME,
});
// const conn = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // Required for Render PostgreSQL
//   },
// });
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

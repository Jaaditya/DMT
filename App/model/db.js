require("dotenv").config();
const { Client, Pool } = require("pg");

const conn = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  port: process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

// const conn = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
// });


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

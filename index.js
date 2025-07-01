require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRouter = require("./App/routes/web/userRoutes");
const adminRouter = require("./App/routes/admin/adminRoutes");
const conn = require("./App/model/db"); // This should export a Pool

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/web/api", userRouter);
app.use("/web/api", adminRouter);

// Health check
app.get('/', async (req, res) => {
  try {
    const result = await conn.query('SELECT NOW()');
    res.send(`✅ Connected to PostgreSQL: ${result.rows[0].now}`);
  } catch (err) {
    console.error('❌ Error querying database:', err);
    res.status(500).send('Database connection error');
  }
});

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

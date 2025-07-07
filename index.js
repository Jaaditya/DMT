require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const userRouter = require("./App/routes/web/userRoutes");
const adminRouter = require("./App/routes/admin/adminRoutes");
const machineRouter = require("./App/routes/machineRoutes"); // Assuming you have this route set up
const conn = require("./App/model/db"); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

// Routes
app.use("/web/api", userRouter);
app.use("/web/api", adminRouter);
app.use("/web/api", machineRouter);

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
const IP = process.env.IP || 'localhost';
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port http://${IP}:${PORT}`);
});

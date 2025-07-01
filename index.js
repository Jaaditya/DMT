require("dotenv").config();
const express = require("express");
const userRouter = require("./App/routes/web/userRoutes");
const adminRouter = require("./App/routes/admin/adminRoutes")
const conn = require("./App/model/db");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded(
  { extended: true }
))
app.use(cors());


app.use('/web/api', userRouter);
app.use('/web/api', adminRouter);


const IP = process.env.PGHOST;


const PORT = process.env.PGPORT;
app.listen(PORT,IP, () => {
  console.log(`Server is running at http://${IP}:${PORT}`);
});

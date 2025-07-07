const express = require("express");
const multer = require("multer");
const { uploadMachine, fetchMachines } = require("../controller/machineController");

const router = express.Router();

// Image upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/machines", upload.single("image"), uploadMachine);
router.get("/machines", fetchMachines);

module.exports = router;

const adminl = require("../../model/adminmodel");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required." });
  }

  try {
    const admin = await adminl({ email, password });
    if (admin) {
      res.status(200).json({ message: "Login Successful", admin });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = loginAdmin;

const {
  createUser,
  login,
  createService,
  getUserById
} = require("../../model/user.model");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const user = await createUser({ name, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    if (err.code === "23505") {
      res.status(409).json({ error: "Email already registered" });
    } else {
      res.status(500).json({ error: "Registration failed" });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await login({ email, password });
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

const serviceBook = async (req, res) => {
  const {
    cname,
    cnumber,
    email,
    mode,
    year,
    vnumber,
    mileage,
    stype,
    issues,
    servicedate,
    servicecenter,
  } = req.body;

  if (
    !cname ||
    !cnumber ||
    !email ||
    !mode ||
    !year ||
    !vnumber ||
    !mileage ||
    !stype ||
    !issues ||
    !servicedate ||
    !servicecenter
  ) {
    return res
      .status(400)
      .json({ error: "All required fields must be filled." });
  }

  try {
    const booking = await createService({
      cname,
      cnumber,
      email,
      mode,
      year,
      vnumber,
      mileage,
      stype,
      issues,
      servicedate,
      servicecenter,
    });

    res.status(201).json({ message: "Service booked successfully", booking });
  } catch (err) {
    if (err.code === "23505") {
      res.status(409).json({ error: "Duplicate booking detected" });
    } else {
      res.status(500).json({ error: "Booking failed" });
    }
  }
};

const userDetails = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  serviceBook,
  userDetails,
};

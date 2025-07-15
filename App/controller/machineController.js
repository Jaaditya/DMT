const { createMachine, getMachines, deleteMachine } = require("../model/machine.model");

const uploadMachine = async (req, res) => {
  try {
    const { name, category, model, description } = req.body;
    const image_path = req.file ? `/uploads/${req.file.filename}` : '';

    const newMachine = await createMachine({
      name,
      category,
      model,
      description,
      image_path,
    });

    res.status(201).json(newMachine);
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: "Failed to upload machine" });
  }
};

const fetchMachines = async (req, res) => {
  try {
    const category = req.query.category;
    const machines = await getMachines(category);
    res.json(machines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch machines" });
  }
};

const removeMachine = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteMachine(id);
    res.json(result);
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ error: "Failed to delete machine" });
}
  };

module.exports = { uploadMachine, fetchMachines, removeMachine };

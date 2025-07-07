const conn = require("./db");


const createMachine = async ({ name, image_path, category, description, model }) => {
  const query = `
    INSERT INTO machines (name, image_path, category, description, model)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, image_path, category, description, model
  `;
  const values = [name, image_path, category, description, model];

  try {
    const result = await conn.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};
const getMachines = async (category = null) => {
  let query = `
    SELECT name, image_path, category, description, model
    FROM machines
  `;
  let values = [];

  if (category) {
    query += ` WHERE LOWER(category) = LOWER($1)`;
    values.push(category);
  }

  try {
    const result = await conn.query(query, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getMachines,createMachine,

};

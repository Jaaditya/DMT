const conn = require("./db");

const adminl = async ({ email, password }) => {
  const query = `SELECT id, name, email FROM admin WHERE email = $1 AND password = $2`;
  const values = [email, password];

  try {
    const result = await conn.query(query, values);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = adminl;

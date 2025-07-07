const conn = require("./db");

const createUser = async ({ name, email, password }) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email
  `;
  const values = [name, email, password];

  try {
    const result = await conn.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const login = async ({ email, password }) => {
  const query = `
    SELECT id, name, email
    FROM users
    WHERE email = $1 AND password = $2
  `;
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
const getUserById = async (id) => {
  const query = `SELECT id, name, email FROM users WHERE id = $1`;
  const values = [id];

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


const createService = async ({
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
}) => {
  const query = `INSERT INTO services (
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
    servicecenter) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id,
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
    servicecenter`;

  const values = [
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
  ];

  try {
    const result = await conn.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = { createUser, login, createService, getUserById };

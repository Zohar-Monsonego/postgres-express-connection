import express from "express";
import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const app = express();
const PORT = 3000;

//creating an object who manage the connection to postgress
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/question1", async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT COUNT(*) AS france_costomers
            FROM customers
            WHERE country = 'France'
        `);

    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.get("/question2", async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT firstname, lastname
            FROM employees
            WHERE reportsto=1143`);

    res.json(result.rows);
  } catch (e) {
    console.log("Database error while trying to fetch in question2");
    res
      .status(500)
      .json({ error: "error while fetching from database in question2" });
  }
});

app.get("/question3", async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT SUM(quantityinstock) AS total_sum
            FROM products
            WHERE productline = 'Classic Cars'`);

    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "error while fetching from database in question3" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

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

// ------ Extra -------
app.get("/q2", async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT COUNT(*) AS USA_customers
            FROM customers
            WHERE country = 'USA'`);

    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "error while fetching from database USA customers" });
  }
});

app.get("/q3", async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT MAX(amount) AS max_amount
            FROM payments`);

    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "error while fetching from database max amount" });
  }
});

app.get("/q4", async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT firstname, lastname
            FROM employees
            WHERE jobtitle = 'Sales Rep'`);

    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "error while fetching from database" });
  }
});

app.get("/q5", async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT AVG(creditlimit) AS average_credit_limit
            FROM customers`);

    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "error while fetching from database" });
  }
});

app.get("/q6", async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT COUNT(DISTINCT productline) AS total_product_lines 
            FROM products`);

    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "error while fetching from database" });
  }
});

app.get("/q8", async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT SUM(quantityinstock) AS total_quantity
            FROM products`);

    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "error while fetching from database" });
  }
});

app.get("/q9", async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT productname
            FROM products
            WHERE buyprice > 100`);

    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "error while fetching from database" });
  }
});

app.get("/q10", async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT officecode, COUNT(*) AS employee_count
            FROM employees
            GROUP BY officecode
            ORDER BY employee_count DESC
            LIMIT 1`);

    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "error while fetching from database" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

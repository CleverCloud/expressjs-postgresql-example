import pg from "pg";
import statsd from "./statsd.js";

let pool;

const createTableText = `
  CREATE TABLE IF NOT EXISTS values (
    id SERIAL PRIMARY KEY,
    data JSONB
  );
`;

export async function connectDB() {
  pool = new pg.Pool({
    connectionString:
      process.env.POSTGRESQL_ADDON_DIRECT_URI ||
      process.env.POSTGRESQL_ADDON_URI,
  });
  await pool.query(createTableText);
}

async function updateGauge() {
  const { rows } = await pool.query("SELECT COUNT(1) FROM values;");
  statsd.gauge("values", rows[0].count);
}

export async function getVal(res) {
  const { rows } = await pool.query("SELECT * FROM values;");
  const values = {};
  for (const row of rows) {
    values[row.id] = row.data.value;
  }
  res.render("index", { title: "Express.js PostgreSQL Demo", values });
}

export async function sendVal(val, res) {
  const { rows } = await pool.query(
    "INSERT INTO values(data) VALUES($1) RETURNING *",
    [{ value: val }]
  );
  const result = rows[0];
  updateGauge();
  statsd.increment("creations");
  res.status(201).json({
    status: "ok",
    value: result.data.value,
    id: result.id,
  });
}

export async function delVal(id) {
  await pool.query("DELETE FROM values WHERE id = $1", [id]);
  updateGauge();
  statsd.increment("deletions");
}

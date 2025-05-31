const express = require("express");
const cors = require("cors");
const db = require("./db").default;

const app = express();
const PORT = 3000;
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});
app.use(cors());
app.use(express.json());

app.post("/api/flow", async (req, res) => {
  const { flow_rate } = req.body;

  if (typeof flow_rate !== "number") {
    return res.status(400).json({ error: "Invalid data format" });
  }

  try {
    const result = await db.query(
      "INSERT INTO flow_data (flow_rate) VALUES ($1) RETURNING *",
      [flow_rate]
    );

    io.emit("flow-update", result.rows[0]);
    res.json({ code: 200, data: result.rows[0] });
  } catch (err) {
  console.error("Database error:", err.message, err.stack);
  res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/flow", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM flow_data ORDER BY received_date DESC LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (err) {
  console.error("Database error:", err.message, err.stack);
  res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/flow/history", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM flow_data ORDER BY received_date ASC"
    );
    res.json(result.rows);
  } catch (err) {
  console.error("Database error:", err.message, err.stack);
  res.status(500).json({ error: "Database error" });
  }
});

// GET threshold for a specific device
app.get("/api/settings/threshold/:deviceId", async (req, res) => {
  const { deviceId } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM threshold_settings WHERE device_id = $1",
      [deviceId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Threshold settings not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database error:", err.message, err.stack);
    res.status(500).json({ error: "Database error" });
  }
});

// UPSERT threshold for a specific device
app.post("/api/settings/threshold/:deviceId", async (req, res) => {
  const { deviceId } = req.params;
  const { threshold_value, threshold_duration } = req.body;

  if (typeof threshold_value !== "number" || typeof threshold_duration !== "number") {
    return res.status(400).json({ error: "Invalid input format" });
  }

  try {
    const result = await db.query(
      `
      INSERT INTO threshold_settings (device_id, threshold_value, threshold_duration, updated_at)
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT (device_id) DO UPDATE
        SET threshold_value = EXCLUDED.threshold_value,
            threshold_duration = EXCLUDED.threshold_duration,
            updated_at = NOW()
      RETURNING *;
      `,
      [deviceId, threshold_value, threshold_duration]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("Database error:", err.message, err.stack);
    res.status(500).json({ error: "Database error" });
  }
});


server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

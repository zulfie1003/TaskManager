const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/task.routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Task Manager API is running" });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`✅ Task Manager API running at http://localhost:${PORT}`);
});

module.exports = app;

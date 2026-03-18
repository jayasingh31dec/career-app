// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // connect DB
// connectDB();

// // routes
// const authRoutes = require("./routes/authRoutes");
// app.use("/api", authRoutes);

// app.get("/", (req, res) => {
//   res.send("API Running");
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });















// backend/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

// Serve Frontend Build (for production)
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
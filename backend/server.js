const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
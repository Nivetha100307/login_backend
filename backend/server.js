require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: "*", // change to Netlify URL later
}));

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

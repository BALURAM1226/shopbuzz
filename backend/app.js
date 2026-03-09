const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');

const app = express();
const port = process.env.PORT || 5000;
const DB = process.env.DB;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ShopBuzz API" });
});

// Database connection
mongoose.connect(DB)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




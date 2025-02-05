const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// env configuration
dotenv.config();

// router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
// mongodb connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/my-blog", userRoutes);
app.use("/my-blog", blogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(
    `server is running in ${process.env.DEV_MODE} successfully at http://localhost:${PORT}`
  );
});

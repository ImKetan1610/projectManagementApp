const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

// load environment variables
dotenv.config();

// creating express app
const app = express();

// enabling cors for any unknown origin
app.use(cors());

// parses incoming requests with JSON payloads
app.use(express.json());

// Database Connection
connectDb();

// Routes for user and task
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}.`);
});

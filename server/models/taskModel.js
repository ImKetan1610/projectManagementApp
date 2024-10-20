const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {},
  {
    versionKey: false,
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;

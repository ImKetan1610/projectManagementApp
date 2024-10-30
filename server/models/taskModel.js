const mongoose = require("mongoose");

const checklistSchema = mongoose.Schema({
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    priority: { type: String, required: true },
    dueDate: { type: Date, default: "null" },
    status: {
      type: String,
      enum: ["backlog", "to-do", "in-progress", "done"],
      default: "backlog",
    },
    category: { type: String, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sharedWith: [{ type: String, required: false }],
    checklist: [checklistSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;

const Task = require("../models/taskModel");

const createTask = async (req, res) => {
  const { title, priority, dueDate, category, sharedWith, user } = req.body;

  try {
    const newTask = await Task.create({
      title,
      priority,
      dueDate,
      category,
      sharedWith,
      user
    });

    if (!newTask) {
      return res
        .status(400)
        .json({ message: "Not able to create the new task." });
    }

    return res.status(201).json({ message: "Created new task." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error. " + error });
  }
};

const getUserTask = async (req, res) => {
  const id = req.user._id;

  try {
    const allTasks = await Task.find({ user: id });

    if (!allTasks) {
      return res.status(404).json({ tasks: allTasks });
    }

    return res.status(200).json(allTasks);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error. " + error });
  }
};

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "task not found." });
    }

    task.status = status;
    const updatedTask = await task.save();

    return res.status(200).json({ task: updatedTask });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error. " + error });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "task not found." });
    }

    await task.remove();
    return res.status(200).json({ message: "Task removed." });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error. " + error });
  }
};

module.exports = { getUserTask, createTask, updateTaskStatus, deleteTask };

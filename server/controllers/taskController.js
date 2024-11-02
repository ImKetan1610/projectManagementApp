const { mongoose } = require("mongoose");
const Task = require("../models/taskModel");

const createTask = async (req, res) => {
  const { title, priority, dueDate, category, sharedWith, user, checklist } =
    req.body;

  try {
    const newTask = await Task.create({
      title,
      priority,
      dueDate,
      category,
      sharedWith,
      user,
      checklist,
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
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.status(200).json({ message: "Task removed." });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error. " + error });
  }
};

function getDateRange(filter) {
  const now = new Date();

  let start, end;

  switch (filter) {
    case "today":
      start = new Date(now.setHours(0, 0, 0, 0));
      end = new Date(now.setHours(23, 59, 59, 999));
      break;

    case "thisWeek":
      const startOfWeek = new Date(
        now.setDate(now.getDate() - now.getDay() + 1)
      ); // Start of Monday
      start = new Date(startOfWeek.setHours(0, 0, 0, 0));
      end = new Date(startOfWeek.setDate(startOfWeek.getDate() + 6)).setHours(
        23,
        59,
        59,
        999
      ); // End of Sunday
      break;

    case "thisMonth":
      start = new Date(now.getFullYear(), now.getMonth(), 1); // Start of month
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999); // End of month
      break;

    default:
      start = end = null;
  }

  return { start, end };
}

// wrto due date
const getFilteredTask = async (req, res) => {
  const { filter } = req.query;

  try {
    const { start, end } = getDateRange(filter);

    let query = {};
    if (start && end) {
      query.dueDate = { $gte: start, $lte: end };
    }

    const tasks = await Task.find(query);

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks " + error });
  }
};

const filterByStatus = async (req, res) => {
  const { userId, status, filter } = req.query;

  try {
    // Validate status if provided
    const validStatuses = ["backlog", "to-do", "in-progress", "done"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Get date range based on filter if provided
    let dateQuery = {};
    if (filter) {
      const { start, end } = getDateRange(filter);
      dateQuery = {
        $or: [{ dueDate: { $gte: start, $lte: end } }, { dueDate: null }],
      };
    }

    // Build the query object
    const query = { user: userId, ...(status && { status }), ...dateQuery };

    // Find tasks based on query
    const tasks = await Task.find(query);
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error filtering tasks:", error);
    return res.status(500).json({ message: "Error filtering tasks " + error });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Check if the provided status is valid
  const validStatuses = ["backlog", "to-do", "in-progress", "done"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getTasksByPriority = async (req, res) => {
  const { priority } = req.params;
  try {
    const tasks = await Task.find({ priority });
    if (!tasks) {
      return res.status(404).json({ message: "Tasks are not found." });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const dueDateTasks = async (req, res) => {
  try {
    // Fetch tasks where dueDate is not null
    const tasksWithDueDate = await Task.find({ dueDate: { $ne: null } });

    return res.status(200).json(tasksWithDueDate);
  } catch (error) {
    console.error("Error fetching tasks by due date:", error);
    return res.status(500).json({ message: "Failed to retrieve tasks." });
  }
};

const getTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID format." });
    }
    // Find the task by ID
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    // Return the found task
    return res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching tasks by due date:", error);
    return res.status(500).json({ message: "Failed to retrieve tasks." });
  }
};

const editTask = async (req, res) => {
  const { title, priority, dueDate, status, category, sharedWith, checklist } =
    req.body;
  const taskId = req.params.id;

  console.log("Ketan",
    title,
    priority,
    dueDate,
    status,
    category,
    sharedWith,
    checklist
  );
  
  try {
    // Find the task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        priority,
        dueDate,
        status,
        category,
        sharedWith,
        checklist,
      },
      { new: true, runValidators: true } // options: return the updated document, validate the data
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Return the updated task
    res.status(200).json(updatedTask);
  } catch (error) {
    // Handle errors (e.g., validation errors)
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getUserTask,
  createTask,
  updateTaskStatus,
  deleteTask,
  getFilteredTask,
  filterByStatus,
  updateStatus,
  getTasksByPriority,
  dueDateTasks,
  getTaskById,
  editTask,
};

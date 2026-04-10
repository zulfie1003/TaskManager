const TaskModel = require("../models/task.model");

const TaskController = {
  // GET /tasks
  getAllTasks(req, res) {
    const tasks = TaskModel.getAll();
    res.status(200).json({ success: true, data: tasks, count: tasks.length });
  },

  // POST /tasks
  createTask(req, res) {
    const { title } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Task title is required and must be a non-empty string.",
      });
    }

    if (title.trim().length > 200) {
      return res.status(400).json({
        success: false,
        error: "Task title must not exceed 200 characters.",
      });
    }

    const task = TaskModel.create(title);
    res.status(201).json({ success: true, data: task });
  },

  // PATCH /tasks/:id
  updateTask(req, res) {
    const { id } = req.params;
    const { completed, title } = req.body;

    const task = TaskModel.getById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with id "${id}" not found.`,
      });
    }

    const updates = {};

    if (typeof completed === "boolean") {
      updates.completed = completed;
    }

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
          success: false,
          error: "Task title must be a non-empty string.",
        });
      }
      if (title.trim().length > 200) {
        return res.status(400).json({
          success: false,
          error: "Task title must not exceed 200 characters.",
        });
      }
      updates.title = title.trim();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        error: "No valid fields provided for update. Allowed: completed, title.",
      });
    }

    const updated = TaskModel.update(id, updates);
    res.status(200).json({ success: true, data: updated });
  },

  // DELETE /tasks/:id
  deleteTask(req, res) {
    const { id } = req.params;

    const task = TaskModel.getById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with id "${id}" not found.`,
      });
    }

    TaskModel.delete(id);
    res
      .status(200)
      .json({ success: true, message: `Task "${task.title}" deleted.` });
  },
};

module.exports = TaskController;

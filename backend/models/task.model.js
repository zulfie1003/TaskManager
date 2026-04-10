const { v4: uuidv4 } = require("uuid");

// In-memory data store
let tasks = [];

const TaskModel = {
  getAll() {
    return [...tasks].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },

  getById(id) {
    return tasks.find((task) => task.id === id) || null;
  },

  create(title) {
    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    return newTask;
  },

  update(id, updates) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;

    tasks[index] = { ...tasks[index], ...updates };
    return tasks[index];
  },

  delete(id) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;

    tasks.splice(index, 1);
    return true;
  },
};

module.exports = TaskModel;

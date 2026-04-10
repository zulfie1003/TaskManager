import { useState, useEffect, useCallback } from "react";
import { taskApi } from "../api";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await taskApi.getAll();
      setTasks(result.data);
    } catch (err) {
      setError(err.message || "Failed to fetch tasks. Is the server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (title) => {
    const result = await taskApi.create(title);
    setTasks((prev) => [result.data, ...prev]);
    return result.data;
  }, []);

  const toggleTask = useCallback(async (id, currentCompleted) => {
    const result = await taskApi.update(id, { completed: !currentCompleted });
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? result.data : task))
    );
  }, []);

  const editTask = useCallback(async (id, title) => {
    const result = await taskApi.update(id, { title });
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? result.data : task))
    );
  }, []);

  const removeTask = useCallback(async (id) => {
    await taskApi.delete(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    toggleTask,
    editTask,
    removeTask,
  };
}

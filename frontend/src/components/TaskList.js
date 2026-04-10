import { useState } from "react";
import { TaskItem } from "./TaskItem";

const FILTERS = ["all", "active", "completed"];

export function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="task-list">
      <div className="task-list__filters" role="tablist" aria-label="Filter tasks">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            className={`filter-btn ${filter === f ? "filter-btn--active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="filter-btn__count">{counts[f]}</span>
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">
            {filter === "completed" ? "🎉" : filter === "active" ? "✅" : "📋"}
          </span>
          <p className="empty-state__text">
            {filter === "all"
              ? "No tasks yet. Add one above!"
              : filter === "active"
              ? "No active tasks. You're all caught up!"
              : "No completed tasks yet."}
          </p>
        </div>
      ) : (
        <ul className="task-list__items">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

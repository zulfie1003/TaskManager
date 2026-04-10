import { useState } from "react";

export function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const [editError, setEditError] = useState("");
  const [busy, setBusy] = useState(false);

  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleToggle = async () => {
    try {
      setBusy(true);
      await onToggle(task.id, task.completed);
    } catch (err) {
      console.error("Toggle failed:", err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    try {
      setBusy(true);
      await onDelete(task.id);
    } catch (err) {
      console.error("Delete failed:", err.message);
      setBusy(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const trimmed = editValue.trim();
    if (!trimmed) {
      setEditError("Title cannot be empty.");
      return;
    }
    if (trimmed === task.title) {
      setIsEditing(false);
      return;
    }
    try {
      setBusy(true);
      setEditError("");
      await onEdit(task.id, trimmed);
      setIsEditing(false);
    } catch (err) {
      setEditError(err.message || "Edit failed.");
    } finally {
      setBusy(false);
    }
  };

  const handleEditCancel = () => {
    setEditValue(task.title);
    setEditError("");
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? "task-item--completed" : ""} ${busy ? "task-item--busy" : ""}`}>
      <button
        className="task-item__check"
        onClick={handleToggle}
        disabled={busy}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        title={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        <span className="task-item__check-icon">
          {task.completed ? "✓" : ""}
        </span>
      </button>

      <div className="task-item__body">
        {isEditing ? (
          <form className="task-item__edit-form" onSubmit={handleEditSubmit}>
            <input
              className="task-item__edit-input"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              maxLength={200}
              autoFocus
              disabled={busy}
            />
            {editError && <p className="task-item__edit-error">{editError}</p>}
            <div className="task-item__edit-actions">
              <button type="submit" className="btn btn--save" disabled={busy}>
                Save
              </button>
              <button
                type="button"
                className="btn btn--cancel"
                onClick={handleEditCancel}
                disabled={busy}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <span className="task-item__title">{task.title}</span>
            <span className="task-item__date">{formattedDate}</span>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="task-item__actions">
          <button
            className="btn btn--edit"
            onClick={() => setIsEditing(true)}
            disabled={busy}
            aria-label="Edit task"
            title="Edit task"
          >
            ✎
          </button>
          <button
            className="btn btn--delete"
            onClick={handleDelete}
            disabled={busy}
            aria-label="Delete task"
            title="Delete task"
          >
            ✕
          </button>
        </div>
      )}
    </li>
  );
}

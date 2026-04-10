import { useState } from "react";

export function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [inputError, setInputError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setInputError("Task title cannot be empty.");
      return;
    }
    if (trimmed.length > 200) {
      setInputError("Title must be 200 characters or fewer.");
      return;
    }

    try {
      setSubmitting(true);
      setInputError("");
      await onAdd(trimmed);
      setTitle("");
    } catch (err) {
      setInputError(err.message || "Failed to add task.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-form__row">
        <input
          className={`add-form__input ${inputError ? "add-form__input--error" : ""}`}
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (inputError) setInputError("");
          }}
          placeholder="What needs to be done?"
          maxLength={200}
          disabled={submitting}
          aria-label="New task title"
        />
        <button
          className="add-form__btn"
          type="submit"
          disabled={submitting}
          aria-label="Add task"
        >
          {submitting ? "Adding…" : "Add Task"}
        </button>
      </div>
      {inputError && <p className="add-form__error">{inputError}</p>}
    </form>
  );
}

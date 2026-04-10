import { useTasks } from "./hooks/useTasks";
import { AddTaskForm } from "./components/AddTaskForm";
import { TaskList } from "./components/TaskList";
import "./App.css";

export default function App() {
  const { tasks, loading, error, fetchTasks, addTask, toggleTask, editTask, removeTask } =
    useTasks();

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-inner">
          <div className="app__logo">
            <span className="app__logo-mark">◈</span>
          </div>
          <div>
            <h1 className="app__title">TaskFlow</h1>
            <p className="app__subtitle">Stay organised, stay ahead</p>
          </div>
        </div>

        {tasks.length > 0 && (
          <div className="app__progress">
            <div className="app__progress-bar">
              <div
                className="app__progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="app__progress-label">
              {completedCount}/{tasks.length} completed
            </span>
          </div>
        )}
      </header>

      <main className="app__main">
        <AddTaskForm onAdd={addTask} />

        <div className="app__divider" />

        {loading ? (
          <div className="status-state">
            <span className="status-state__spinner" />
            <p>Loading tasks…</p>
          </div>
        ) : error ? (
          <div className="status-state status-state--error">
            <span className="status-state__icon">⚠</span>
            <p className="status-state__message">{error}</p>
            <button className="btn btn--retry" onClick={fetchTasks}>
              Retry
            </button>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onEdit={editTask}
            onDelete={removeTask}
          />
        )}
      </main>

      <footer className="app__footer">
        <p>TaskFlow — built with React &amp; Express</p>
      </footer>
    </div>
  );
}

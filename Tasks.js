// Tasks.jsx
import React, { useEffect, useState } from "react";
import FullscreenLayout from "../components/FullscreenLayout";
import { createTask as apiCreateTask, getTasks as apiGetTasks } from "../api"; // adjust paths
import useAuthRedirect from "../hooks/useAuthRedirect"; // optional: ensure user logged in
// If you don't have the hook above, ignore import and not use it

export default function Tasks() {
  // useAuthRedirect(); // optional - redirect to login if no token

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchTasks() {
    try {
      setLoading(true);
      const t = await apiGetTasks();
      setTasks(t || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await apiCreateTask(form);
      setForm({ title: "", description: "", priority: "medium", status: "todo" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <FullscreenLayout>
      <div className="card-form" style={{ maxWidth: 900 }}>
        <div className="tasks-card">
          <div>
            <h3 className="section-title">Your Tasks</h3>
            <div style={{ color: "var(--muted)", marginBottom: 12 }}>Create Task</div>

            <form onSubmit={handleCreate}>
              <div className="form-field">
                <label className="hidden-visually">Title</label>
                <div className="input-with-icon">
                  <span className="input-icon">🗒️</span>
                  <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="hidden-visually">Description</label>
                <div className="input-with-icon">
                  <span className="input-icon">✎</span>
                  <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="label-inline" style={{ minWidth: 64 }}>Levels:</div>
                  <div className="select-wrap">
                    <select
                      className="styled-select"
                      value={form.priority}
                      onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="label-inline" style={{ minWidth: 64 }}>To do:</div>
                  <div className="select-wrap">
                    <select
                      className="styled-select"
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                      <option value="todo">To do</option>
                      <option value="inprogress">In progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="create-task-row">
                <button type="submit" className="btn-round">Create Task</button>
              </div>
            </form>

            <div className="note-empty">No tasks yet — create one above.</div>
          </div>

          <div>
            <h4 className="section-title">Stats</h4>
            <div className="stats-box">
              <div>Total: {tasks.length}</div>
              <div>Done: {tasks.filter(t => t.status === "done").length}</div>
              <div>To do: {tasks.filter(t => t.status === "todo").length}</div>
              <div>In progress: {tasks.filter(t => t.status === "inprogress").length}</div>
            </div>

            <div style={{ marginTop: 14 }}>
              <div className="small-muted" style={{ marginBottom: 8 }}>By priority</div>
              <div className="stats-box" style={{ padding: 12 }}>
                <div>Low: {tasks.filter(t => t.priority === "low").length}</div>
                <div>Medium: {tasks.filter(t => t.priority === "medium").length}</div>
                <div>High: {tasks.filter(t => t.priority === "high").length}</div>
              </div>
            </div>

            <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
              <button className="btn-clear" onClick={() => fetchTasks()}>
                Refresh
              </button>
              <button className="btn-clear" onClick={() => { localStorage.removeItem("authToken"); window.location.href = "/login"; }}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </FullscreenLayout>
  );
}

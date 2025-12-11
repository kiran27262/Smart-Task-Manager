import React, { useEffect, useState } from "react";
import { getTasks } from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!token || !userId) return;
    getTasks(userId, token).then(data => {
      const tasks = Array.isArray(data) ? data : [];
      const total = tasks.length;
      const done = tasks.filter(t => t.status === "DONE").length;
      const todo = tasks.filter(t => t.status === "TODO").length;
      const inProg = tasks.filter(t => t.status === "IN_PROGRESS").length;
      const byPriority = tasks.reduce((acc, t) => {
        acc[t.priority] = (acc[t.priority] || 0) + 1; return acc;
      }, {});
      setStats({ total, done, todo, inProg, byPriority });
    });
  }, []);

  if (!stats) return <div className="page-container"><div className="card">Loading...</div></div>;

  return (
    <div className="page-container">
      <div className="header-row">
        <h2>Dashboard</h2>
        <Link to="/tasks" className="link">Back to Tasks</Link>
      </div>

      <div className="card stats-grid">
        <div className="stat">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat">
          <div className="stat-number">{stats.done}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat">
          <div className="stat-number">{stats.todo}</div>
          <div className="stat-label">To Do</div>
        </div>
        <div className="stat">
          <div className="stat-number">{stats.inProg}</div>
          <div className="stat-label">In Progress</div>
        </div>
      </div>

      <div className="card">
        <h3>By Priority</h3>
        <ul>
          {Object.entries(stats.byPriority).map(([p, c]) => <li key={p}>{p}: {c}</li>)}
        </ul>
      </div>
    </div>
  );
}

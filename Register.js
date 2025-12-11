// Register.jsx
import React, { useState } from "react";
import FullscreenLayout from "../components/FullscreenLayout";
import { registerUser, login as apiLogin } from "../api"; // adjust path to your api helper
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setErr("");
    try {
      await registerUser(form); // call register endpoint
      // Auto-login after successful register
      const resp = await apiLogin({ email: form.email, password: form.password });
      if (resp?.token) localStorage.setItem("authToken", resp.token);
      navigate("/tasks");
    } catch (error) {
      setErr(error?.message || "Registration failed");
    }
  }

  return (
    <FullscreenLayout>
      <div className="card-form">
        <h2 className="auth-title">Create an account</h2>
        <div className="auth-sub">Join and start using the app</div>

        <form onSubmit={handleRegister}>
          <div className="form-field">
            <label className="hidden-visually">Name</label>
            <div className="input-with-icon">
              <span className="input-icon">👤</span>
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          <div className="form-field">
            <label className="hidden-visually">Email</label>
            <div className="input-with-icon">
              <span className="input-icon">✉️</span>
              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-field">
            <label className="hidden-visually">Password</label>
            <div className="input-with-icon" style={{ position: "relative" }}>
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShow((s) => !s)}
                aria-label="Toggle password"
              >
                {show ? (
                  <svg viewBox="0 0 24 24">
                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24">
                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {err && <div style={{ color: "#ffb3b3", textAlign: "center" }}>{err}</div>}

          <div style={{ marginTop: 8 }}>
            <button className="btn-primary" type="submit">
              Create Account
            </button>
          </div>

          <div className="register-row">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </FullscreenLayout>
  );
}

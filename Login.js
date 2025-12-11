// Login.jsx
import React, { useState } from "react";
import FullscreenLayout from "../components/FullscreenLayout";
import { login as apiLogin } from "../api"; // adjust path to your api helper
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("kiran@example.com");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    try {
      const resp = await apiLogin({ email, password }); // assumes API returns token
      // Save token - adapt to your auth flow
      if (resp?.token) {
        localStorage.setItem("authToken", resp.token);
      }
      if (remember) localStorage.setItem("rememberEmail", email);
      navigate("/tasks");
    } catch (error) {
      setErr(error?.message || "Login failed");
    }
  }

  return (
    <FullscreenLayout>
      <div className="card-form">
        <h2 className="auth-title">Welcome Back</h2>
        <div className="auth-sub">Sign in to continue</div>

        <form onSubmit={handleLogin}>
          <div className="form-field">
            <label className="hidden-visually">Email</label>
            <div className="input-with-icon">
              <span className="input-icon">✉️</span>
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="hidden-visually">Password</label>
            <div className="input-with-icon" style={{ position: "relative" }}>
              <input
                name="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
              />
              <button
                type="button"
                aria-label="Toggle password"
                className="eye-button"
                onClick={() => setShow((s) => !s)}
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

          <div className="row-between">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a className="forgot" href="/forgot-password">
              Forgot password?
            </a>
          </div>

          {err && <div style={{ color: "#ffb3b3", textAlign: "center" }}>{err}</div>}

          <div style={{ marginTop: 8 }}>
            <button className="btn-primary" type="submit">
              Login
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <button
              type="button"
              className="btn-clear"
              onClick={() => {
                setEmail("");
                setPassword("");
                setErr("");
              }}
            >
              Clear
            </button>
          </div>

          <div className="register-row">
            Don't have an account? <a href="/register">Register now</a>
          </div>
        </form>
      </div>
    </FullscreenLayout>
  );
}

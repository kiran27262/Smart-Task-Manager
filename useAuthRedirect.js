// frontend/src/hooks/useAuthRedirect.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Simple hook: if there's no auth token in localStorage, redirect to /login
 * Adjust localStorage key or check method if you use a different auth flow.
 */
export default function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token"); // change if you store differently
      if (!token) {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      // fallback redirect if something goes wrong reading storage
      navigate("/login", { replace: true });
    }
  }, [navigate]);
}

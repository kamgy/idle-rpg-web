import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { login, refreshLogin } from "../services/authService";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false); // state to track if auth check is done
  const navigate = useNavigate();
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (storedRefreshToken) {
      // If a refresh token exists, attempt to refresh login
      refreshLogin({ refreshToken: storedRefreshToken })
        .then(({ token, refreshToken: newRefreshToken }) => {
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", newRefreshToken);
          navigate("/home");
        })
        .catch((err) => {
          console.error("Refresh login failed:", err);
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          setAuthChecked(true);
        });
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  // If auth hasn't been checked, render nothing (or a loading spinner)
  if (!authChecked) {
    return null; // or <div className="loading">Loading...</div>
  }

  const handleLogin = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    setError(null);
    try {
      const { token, refreshToken } = await login({ email, password });
      console.log("Login successful:", token);
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <main>
      <h1>Idle RPG</h1>
      <p>Your adventure continues, even when you're away.</p>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && passwordInputRef.current) {
                  e.preventDefault();
                  passwordInputRef.current.focus();
                }
              }}
              enterKeyHint="next"
            />
          </div>
          <div className="input-group">
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordInputRef}
              enterKeyHint="go"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <Button type="submit" variant="primary">
            Login
          </Button>
        </form>
        <div>
          <Button variant="secondary" onClick={navigateToRegister}>
            Register
          </Button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

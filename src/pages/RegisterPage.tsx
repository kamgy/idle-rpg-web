import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { register } from "../services/registerService";
import "./RegisterPage.css";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nickNameInputRef = useRef<HTMLInputElement>(null);

  const handleRegister = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email || !password || !nickName) {
      setError("All fields are required");
      return;
    }

    try {
      await register({ email, password, nickName });
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  return (
    <main>
      <h1>Start Your Journey</h1>
      <p>Join the Realm. Play Your Way.</p>
      <div className="register-container">
        <form onSubmit={handleRegister}>
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && nickNameInputRef.current) {
                  e.preventDefault();
                  nickNameInputRef.current.focus();
                }
              }}
              enterKeyHint="next"
            />
          </div>
          <div className="input-group">
            <input
              id="nickName"
              type="text"
              value={nickName}
              placeholder="Nick Name"
              onChange={(e) => setNickName(e.target.value)}
              ref={nickNameInputRef}
              enterKeyHint="go"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && (
            <p className="success-message">
              Registration successful! Redirecting to login...
            </p>
          )}
          <Button type="submit" variant="primary">
            Register
          </Button>
        </form>
        <div>
          <Button variant="secondary" onClick={navigateToLogin}>
            Back to Login
          </Button>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;

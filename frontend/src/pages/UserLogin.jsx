import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useState } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserContext";
import Logo from "../components/Logo";

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {serverUrl} = useContext(AuthDataContext)
  const {getUserData} = useContext(UserDataContext)
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
      `${serverUrl}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    getUserData()
    navigate("/");
    } catch (error) {
      if(error.response) {
        setError(error.response.data.message)
      }
    }
  };
  return (
    <div className="auth-page">
      <Logo />
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">U</div>
          <div>
            <div className="auth-title">Welcome to </div>
            <div className="auth-sub">
              Sign in to continue to your user dashboard
            </div>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-row">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input
              autoComplete="none"
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="actions">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div className="small">
                Create account:{" "}
                <Link className="link" to="/user/register">
                  User
                </Link>{" "}
                ·{" "}
                <Link className="link" to="/food-partner/register">
                  Food partner
                </Link>
              </div>
            </div>
             
            <button className="primary-btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;

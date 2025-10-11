import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useState } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import Logo from "../components/Logo";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {serverUrl} = useContext(AuthDataContext)

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
      `${serverUrl}/api/partner/login`,
      { email, password },
      { withCredentials: true }
    );
    navigate("/create-food");
    } catch (error) {
      if(error.response) {
        setError("Invalid email or password")
      }
    }
  };
  return (
    <div className="auth-page">
      <Logo />
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">FP</div>
          <div>
            <div className="auth-title">Partner sign in</div>
            <div className="auth-sub">
              Access your partner dashboard to manage orders
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
              placeholder="partner@example.com"
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
                <Link className="link" to="/food-partner/register">
                  Partner
                </Link>{" "}
                ·{" "}
                <Link className="link" to="/user/register">
                  User
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

export default FoodPartnerLogin;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useState } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import Logo from "../components/Logo";

const UserRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {serverUrl} = useContext(AuthDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
      `${serverUrl}/api/auth/register`,
      { fullName, email, password },
      { withCredentials: true }
    );
    navigate("/");
    } catch (error) {
      if(error.response) {
        setError("Please try again!")
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
            <div className="auth-title">Create user account</div>
            <div className="small">
              Want to register as a partner?{" "}
              <Link className="link" to="/food-partner/register">
                Register as food partner
              </Link>
            </div>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-row">
            <label>Full name</label>
            <input
              autoComplete="none"
              name="name"
              placeholder="Jane Doe"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value.toString())}
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
              onChange={(e) => setPassword(e.target.value.toString())}
              value={password}
            />
          </div>

          <div className="actions">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div className="small">
                Already have an account?{" "}
                <Link className="link" to="/user/login">
                  Sign in
                </Link>
              </div>
            </div>
            <button className="primary-btn" type="submit">
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;

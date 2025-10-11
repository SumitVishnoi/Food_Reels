import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useState } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import Logo from "../components/Logo";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {serverUrl} = useContext(AuthDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
      `${serverUrl}/api/partner/register`,
      {
        name,
        contactName,
        phone,
        address,
        email,
        password,
      },
      { withCredentials: true }
    );
    navigate("/create-food");
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
          <div className="brand">FP</div>
          <div>
            <div className="auth-title">Partner sign up</div>
            <div className="small">
              register as a user:{" "}
              <Link className="link" to="/user/register">
                User register
              </Link>
            </div>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
           {error && <p className="error-message">{error}</p>}
          <div className="form-row">
            <label>Business name</label>
            <input
              name="businessName"
              placeholder="Acme Tiffin Services"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="form-row">
            <label>Contact name</label>
            <input
              name="contactName"
              placeholder="Jane Doe"
              onChange={(e) => setContactName(e.target.value)}
              value={contactName}
            />
          </div>

          <div className="form-row">
            <label>Phone</label>
            <input
              name="phone"
              type="tel"
              placeholder="+1 555 555 5555"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>

          <div className="form-row">
            <label>Address</label>
            <textarea
            id="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              name="address"
              placeholder="Street, City, State, ZIP"
              style={{
                minHeight: 80,
                padding: "0.7rem",
                borderRadius: 8,
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

          <div className="form-row">
            <label>Contact email</label>
            <input
              name="email"
              type="email"
              placeholder="contact@business.com"
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
              placeholder="Choose a strong password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="actions">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div className="small">
                Already registered?{" "}
                <Link className="link" to="/food-partner/login">
                  Sign in
                </Link>
              </div>
            </div>
            <button className="primary-btn" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;

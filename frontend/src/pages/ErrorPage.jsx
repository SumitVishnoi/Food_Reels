import React from "react";
import error from "../assets/error.png";
import "../styles/error.css";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error_page">
      <div className="error_card">
        <div className="error_img">
          <img src={error} alt="" />
        </div>
        <p>We can't seem to find the page you're looking for...</p>
        <button className="error_button" onClick={() => navigate("/")}>Go to Home</button>
      </div>
    </div>
  );
};

export default ErrorPage;

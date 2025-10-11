import React, { useState, useEffect, useContext } from "react";
import "../styles/profile.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import Logo from "../components/Logo";
import CountUp from "../components/CountUp";
import { FaArrowLeft } from "react-icons/fa";

const PartnerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  useEffect(() => {
    axios
      .get(`${serverUrl}/api/partner/${id}`, { withCredentials: true })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      });
  }, [id]);

  return (
    <main className="profile-page">
      <div className="lg">
        <Logo />
      </div>
      <div className="container">
        <section className="profile-header">
        <FaArrowLeft className='back_icon' onClick={()=> navigate("/")}/>
          <div className="profile-meta">
            <img
              className="profile-avatar"
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
              alt="profile"
            />

            <div className="profile-info">
              <h1
                className="profile-pill profile-business"
                title="Business name"
              >
                {profile?.name}
              </h1>
              <p className="profile-pill profile-address" title="Address">
                {`(${profile?.address})`}
              </p>
            </div>
          </div>

          <div className="profile-stats" role="list" aria-label="Stats">
            <div className="profile-stat" role="listitem">
              <span className="profile-stat-label">total meals</span>
              <span className="profile-stat-value">{profile?.totalMeals}</span>

              <CountUp
                from={0}
                to={100}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              />
            </div>
            <div className="profile-stat" role="listitem">
              <span className="profile-stat-label">customer served</span>
              <span className="profile-stat-value">
                {profile?.customersServed}
              </span>
              <CountUp
                from={0}
                to={100}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              />
            </div>
          </div>
        </section>

        <hr className="profile-sep" />

        <section className="profile-grid" aria-label="Videos">
          {videos.map((item, index) => (
            <div key={index} className="profile-grid-item">
              {/* Placeholder tile; replace with <video> or <img> as needed */}

              <video
                className="profile-grid-video"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                src={item.video}
                muted
              ></video>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default PartnerProfile;

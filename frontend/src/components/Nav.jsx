import React, { useContext, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { IoBookmark } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "../styles/nav.css";


const Nav = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = (path) => {
    navigate(path);
    setShowMenu(false);
  };
 

  return (
      <div className="bottom-nav">
      {/* Mobile: show icons */}
      <div className="mobile-view">
        <GoHomeFill className="nav_icon" onClick={() => navigate("/")} />
        <IoBookmark className="nav_icon" onClick={() => navigate("/save")} />
        <CgProfile className="nav_icon" onClick={() => navigate("/user/profile")} />
      </div>

      {/* Tablet & Laptop: show three-dot menu */}
      <div className="desktop-view">
        <MdMoreVert
          className="nav_icon"
          onClick={() => setShowMenu(!showMenu)}
        />
        {showMenu && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => handleMenuClick("/")}>
              Home
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleMenuClick("/save")}
            >
              Saved
            </div>
            <div className="dropdown-item" onClick={() => handleMenuClick("/user/profile")}>
              Profile
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;

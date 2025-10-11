import React, { useContext, useState } from "react";
import "../styles/create-food.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";
import Logo from "../components/Logo";

const CreateFood = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const navigate = useNavigate();
  const {serverUrl} = useContext(AuthDataContext)
  const [fileName, setFileName] = useState(null);

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setVideoSrc(null);
      setFileName(null);
      setVideoFile(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setFileName(file.name);
    setVideoFile(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", desc);
    formData.append("video", videoFile);

    const response = await axios.post(
      `${serverUrl}/api/food`,
      formData,
      { withCredentials: true }
    );
    console.log(response.data);
    navigate("/");
  };

  return (
    <div className="create-food-page">
      <Logo />
      <div className="create-card">
        <h2 style={{ marginTop: 0 }}>Create Food</h2>

        <form onSubmit={onSubmit}>
          <div className="form-row">
            <label>Video</label>
            <label htmlFor="videoFile" className="uploader" tabIndex={0}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3v10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.4 15.4A5 5 0 0 0 12 9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 21a3 3 0 0 0 3-3H9a3 3 0 0 0 3 3z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <div className="uploader-text">
                  Tap to upload or drag a video
                </div>
                <div className="file-name">
                  {fileName || "No file selected"}
                </div>
              </div>
            </label>
            <input
              id="videoFile"
              className="hidden-file"
              type="file"
              accept="video/*"
              name="video"
              onChange={onFileChange}
              required
            />
          </div>

          <div className="video-preview">
            {videoSrc ? (
              <video src={videoSrc} controls />
            ) : (
              <div style={{ padding: "0 1rem", textAlign: "center" }}>
                No video selected — preview will appear here
              </div>
            )}
          </div>

          <div className="form-row">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tasty Paneer Wrap"
              required
            />
          </div>

          <div className="form-row">
            <label>Description</label>
            <textarea
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Short description for the food item"
              required
            />
          </div>

          <div className="actions">
            <button
              className="btn ghost"
              type="button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button className="btn primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;

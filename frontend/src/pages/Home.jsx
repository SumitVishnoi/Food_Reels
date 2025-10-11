import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/reels.css";
import Logo from "../components/Logo";

import { FaRegHeart } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa";
import { IoBookmark, IoClose } from "react-icons/io5";
import { MdOutlineComment } from "react-icons/md";

import Nav from "../components/Nav";
import { AuthDataContext } from "../context/AuthContext";

const Home = () => {
  const { serverUrl } = useContext(AuthDataContext);
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showComment, setShowComment] = useState(false);
  const containerRef = useRef(null);

  /** ---------------- Auto Play Visible Video ---------------- */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const videoEls = container.querySelectorAll("video");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ target, intersectionRatio }) => {
          intersectionRatio >= 0.6
            ? target.play().catch(() => {})
            : target.pause();
        }),
      { threshold: [0.6] }
    );

    videoEls.forEach((v) => observer.observe(v));
    videoEls[0]?.play().catch(() => {});
    return () => observer.disconnect();
  }, [videos]);

  /** ---------------- Helpers ---------------- */
  const updateVideo = (id, changes) => {
    setVideos((prev) => prev.map((v) => (v._id === id ? { ...v, ...changes } : v)));
  };

  const handleAction = async (endpoint, id, field, flagKey, countKey) => {
    try {
      const { data } = await axios.post(`${serverUrl}/api/food/${endpoint}`, { foodId: id }, { withCredentials: true });
      const isActive = data[flagKey];
      updateVideo(id, {
        [countKey]: isActive
          ? (prev) => prev[countKey] + 1
          : (prev) => prev[countKey] - 1,
        [flagKey]: isActive,
      });
    } catch (err) {
      console.error(`Error performing ${endpoint}:`, err);
    }
  };


  const getComments = async (videoId) => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/food/comments/${videoId}`, {
        withCredentials: true,
      });
      updateVideo(videoId, { comments: data.comments || [] });
    } catch {
      updateVideo(videoId, { comments: [] });
    }
  };

  const commentOnVideo = async (item, e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/food/comment/${item._id}`,
        { comment: commentText },
        { withCredentials: true }
      );
      const newComment = data.comment;
      if (newComment) {
        updateVideo(item._id, {
          commentCount: (item.commentCount || 0) + 1,
          comments: [...(item.comments || []), newComment],
        });
        setCommentText("");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const toggleComments = (item) => {
    const isSame = activeVideo === item._id;
    setShowComment(!isSame || !showComment);
    setActiveVideo(isSame ? null : item._id);
    setCommentText("");
    if (!isSame) getComments(item._id);
  };

  const currentVideo = useMemo(
    () => videos.find((v) => v._id === activeVideo),
    [activeVideo, videos]
  );

    // Autoplay behavior is handled inside ReelFeed

    useEffect(() => {
        axios.get(`${serverUrl}/api/food`, { withCredentials: true })
            .then(response => {

                console.log(response.data);

                setVideos(response.data.foodItems)
            })
            
    }, [])

    // Using local refs within ReelFeed; keeping map here for dependency parity if needed

     const likeVideo = async(item)=> {

        const response = await axios.post(`${serverUrl}/api/food/like`, { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
    }

     const saveVideo = async(item) => {
        const response = await axios.post(`${serverUrl}/api/food/save`, { foodId: item._id }, { withCredentials: true })
        
        if(response.data.save){
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount + 1 } : v))
        }else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount - 1 } : v))
        }
    }

    // ✅ Add Comment
  async function addComment(videoId, text) {
    if (!text.trim()) return;

    try {
      const response = await axios.post(
        `${serverUrl}/api/food/comment`,
        { foodId: videoId, text },
        { withCredentials: true }
      );

      const newComment = response.data.comment;

      setVideos((prev) =>
        prev.map((v) =>
          v._id === videoId
            ? { ...v, comments: [...(v.comments || []), newComment] }
            : v
        )
      );
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  /** ---------------- JSX ---------------- */
  return (
    <div className="reels-container" ref={containerRef}>
      <Logo />
      {videos.map((item) => (
        <div key={item._id} className="data">
          <section className="reel-item">
            <div className="reel-top-hint">Reels</div>

            <div className="video-div">
              <video
                src={item.video}
                muted
                loop
                playsInline
                preload="metadata"
                className="reel-video"
              />
            </div>

            <div className="feature">
              <div className="inc">
                {item.likeCount > 0 ? (
                  <GoHeartFill className="icon" color="red" onClick={() => likeVideo(item)} />
                ) : (
                  <FaRegHeart className="icon" onClick={() => likeVideo(item)} />
                )}
                <p>{item.likeCount}</p>
              </div>

              <div className="inc">
                {item.saveCount > 0 ? (
                  <IoBookmark className="icon" color="white" onClick={() => saveVideo(item)} />
                ) : (
                  <FaRegBookmark className="icon" onClick={() => saveVideo(item)} />
                )}
                <p>{item.saveCount}</p>
              </div>

              <div className="inc">
                <MdOutlineComment className="icon" onClick={() => toggleComments(item)} />
                <p>{item.commentCount || 0}</p>
              </div>
            </div>

            <div className="reel-overlay">
              <div className="reel-meta">
                <p className="desc">{item.description}</p>
                <Link to={`/food-partner/${item.foodPartner}`} className="visit-btn">
                  Visit store
                </Link>
              </div>
            </div>
          </section>

          {showComment && activeVideo === item._id && currentVideo && (
            <div className="comments-container">
              <div className="comments-header">
                <IoClose className="close-icon" onClick={() => toggleComments(item)} />
                <h3 className="comment-head">Comments</h3>
              </div>

              <form className="add-comment" onSubmit={(e) => commentOnVideo(item, e)}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit">Add</button>
              </form>

              <div className="comments-section">
                {currentVideo.comments?.length ? (
                  currentVideo.comments.map((c, i) => (
                    <div key={i} className="comment">
                      <p className="comment-username">{c.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-comments">No comments yet. Be the first!</p>
                )}
              </div>
            </div>
          )}

          <Nav />
        </div>
      ))}
    </div>
  );
};

export default Home;

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { FaRegHeart } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa";
import { IoBookmark, IoClose } from "react-icons/io5";
import { MdOutlineComment } from "react-icons/md";
import Logo from "./Logo";

const ReelFeed = ({
  items = [],
  onLike,
  onSave,
  emptyMessage = "No videos yet.",
}) => {
  const videoRefs = useRef(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {
              /* ignore autoplay errors */
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, [items]);

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  return (
    <div className="reels-container">
      <div className="logo_div">
        <Logo />
      </div>
      {items.map((item, i) => (
        <div className="data" key={i}>
          <section className="reel-item">
            <div className="reel-top-hint">Reels</div>
            <div className="video-div">
              <video
                ref={setVideoRef(item._id)}
                className="reel-video"
                src={item.video}
                muted
                playsInline
                loop
                preload="metadata"
              />
            </div>

            <div className="feature">
              <div className="inc">
                {item.likeCount > 0 ? (
                  <GoHeartFill
                    className="icon"
                    color="red"
                    onClick={() => likeVideo(item)}
                  />
                ) : (
                  <FaRegHeart
                    className="icon"
                    onClick={() => likeVideo(item)}
                  />
                )}
                <p>{item.likeCount}</p>
              </div>

              <div className="inc">
                {item.saveCount > 0 ? (
                  <IoBookmark
                    className="icon"
                    color="white"
                    onClick={() => saveVideo(item)}
                  />
                ) : (
                  <FaRegBookmark
                    className="icon"
                    onClick={() => saveVideo(item)}
                  />
                )}
                <p>{item.saveCount}</p>
              </div>

              <div className="inc">
                <MdOutlineComment
                  className="icon"
                  onClick={() => toggleComments(item)}
                />
                <p>{item.commentCount || 0}</p>
              </div>
            </div>

            <div className="reel-overlay">
              <div className="reel-meta">
                {/* <div className="title">Sample video #{i + 1}</div> */}
                {/* <div className="handle">{item.foodPartner.email}</div> */}
                <div className="desc">{item.description}</div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "0.4rem",
                  }}
                >
                  <Link
                    to={"/food-partner/" + item.foodPartner}
                    className="visit-btn"
                  >
                    Visit store
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <div className="nav-div">
            <Nav link={"/food-partner/" + item.foodPartner} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReelFeed;

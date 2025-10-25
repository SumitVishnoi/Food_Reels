import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../styles/reels.css";
import ReelFeed from "../components/ReelFeed";
import { AuthDataContext } from "../context/AuthContext";

const Save = () => {
  const [videos, setVideos] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  useEffect(() => {
    axios
      .get(`${serverUrl}/api/food/savedfood`, {
        withCredentials: true,
      })
      .then((response) => {
        const savedFoods = response.data.savedFood.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          saveCount: item.food.saveCount,
          commentsCount: item.food.commentsCount,
          foodPartner: item.food.foodPartner,
        }));
        setVideos(savedFoods);
      });
  }, []);

  const removeSaved = async (item) => {
    try {
      await axios.post(
        `${serverUrl}/api/food/save`,
        { foodId: item._id },
        { withCredentials: true }
      );
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) }
            : v
        )
      );
    } catch {
      // noop
    }
  };

  return (
    <ReelFeed
      items={videos}
      onSave={removeSaved}
      emptyMessage="No saved videos yet."
    />
  );
};

export default Save;

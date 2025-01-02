import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { listMypostsService } from "../services/blogServices";
import ListPosts from "./ListPosts";
import Header from "../Common/Header";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const postsFetched = await listMypostsService();

      if (postsFetched) {
        setPosts(postsFetched);
      }
    };

    fetchPosts();

    if (!accessToken) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header />
      <div className="pt-16">{accessToken && <ListPosts posts={posts} />}</div>
    </div>
  );
};

export default MyPosts;

import React, { useEffect, useState } from "react";
import { Pen as PenIcon } from "lucide-react";

import Header from "../Common/Header";
import PostForm from "./PostForm";
import ListPosts from "./ListPosts";
import { deltePostService, getPostsService } from "../services/blogServices";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const onOpen = () => setShowPopup(true);
  const onClose = () => setShowPopup(false);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);

  const handleAddNewPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const postsFetched = await getPostsService();

      if (postsFetched) {
        setPosts(postsFetched);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header />
      <div className="p-4 pt-20">
        {accessToken ? (
          <div
            onClick={onOpen}
            className="flex pt-16 gap-3 justify-start items-center cursor-pointer 
          text-yellow-500 hover:text-yellow-600 transition-colors duration-300 
          w-max group"
          >
            <PenIcon className="text-yellow-500 group-hover:rotate-12 transition-transform duration-300" />
            <h4 className="text-white hover:text-yellow-500 transition-colors">
              Write new Blog
            </h4>
          </div>
        ) : (
          <div
            onClick={() => navigate("/login")}
            className="flex gap-3 justify-start items-center cursor-pointer 
          text-yellow-500 hover:text-yellow-600 transition-colors duration-300 
          w-max group"
          >
            <PenIcon className="text-yellow-500 group-hover:rotate-12 transition-transform duration-300" />
            <h4 className="text-white hover:text-yellow-500 transition-colors">
              Login to write your Blog
            </h4>
          </div>
        )}
      </div>
      {accessToken && showPopup && (
        <PostForm addNewPost={handleAddNewPost} onClose={onClose} />
      )}
      <ListPosts  posts={posts} />
    </div>
  );
};

export default Home;

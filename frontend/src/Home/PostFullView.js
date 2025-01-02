import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

import {
  deltePostService,
  retrievePostService,
} from "../services/blogServices";
import PostForm from "./PostForm";
import { useSelector } from "react-redux";
import Header from "../Common/Header";

const PostFullView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const onOpen = () => setShowPopup(true);
  const onClose = () => setShowPopup(false);

  const { accessToken } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPostDetails = async () => {
      const fetchedPost = await retrievePostService(postId);

      if (fetchedPost) {
        setPost(fetchedPost);
      }
    };

    fetchPostDetails();
  }, []);

  const handleDelete = async () => {
    const deleted = await deltePostService(post.id);

    if (deleted) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header />
      <div  className="pt-16  bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Image Section - Full width, prominent */}
          <div className="mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Author Section */}
          <div className="text-center mb-6">
            <p className="text-yellow-400 text-lg">{post.author || "Author"}</p>
            <span className="text-gray-400 text-sm">
              {new Date().toLocaleDateString()}
            </span>
          </div>

          {/* Title Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-center bg-clip-text bg-gradient-to-r from-yellow-400 to-green-600 flex-1">
              {post.title}
            </h1>
            {accessToken && id == post.user && (
              <div className="flex space-x-3">
                <button
                  onClick={onOpen}
                  className="p-2 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/40 transition-colors"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/40 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Content Section - Centered with comfortable reading width */}
          <div className="mx-auto">
            <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
              {post.description}
            </p>
          </div>
        </div>
        {accessToken && showPopup && post.id && (
          <PostForm
            isEditing={true}
            setUpdatedPost={setPost}
            post={post}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default PostFullView;

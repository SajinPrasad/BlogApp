import React from "react";
import { useNavigate } from "react-router-dom";
const ListPosts = ({ posts }) => {
  const navigate = useNavigate();

  const handleNavigate = (post) => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((item) => (
          <div
            onClick={() => handleNavigate(item)}
            key={item.id}
            className="bg-gray-800 cursor-pointer rounded-xl overflow-hidden shadow-lg border border-gray-700 
            transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={`${item.image}`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            {/* Content */}
            <div className="p-6">
              <h5 className="py-2 text-yellow-500 font-semibold">{item.author}</h5>
              <h2
                className="text-xl font-bold mb-2 text-white bg-clip-text 
              bg-gradient-to-r from-yellow-400 to-green-600"
              >
                {item.title}
              </h2>
              <p className="text-gray-300 mb-4 line-clamp-3">
                {item.description}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {/* You could add a date or read time here */}
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl text-gray-400 mb-4">No posts yet</h2>
          <p className="text-gray-500">Start creating your first blog post!</p>
        </div>
      )}
    </div>
  );
};

export default ListPosts;

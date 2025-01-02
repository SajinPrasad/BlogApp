import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  User as UserIcon,
  LogOut as LogOutIcon,
  File as PostIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutService } from "../services/authServices";
import { clearToken } from "../features/authSlice";
import { clearUser } from "../features/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const onLogout = async () => {
    const loggedOut = await logoutService(refreshToken);

    if (loggedOut) {
      dispatch(clearToken());
      dispatch(clearUser());
    }
  };

  return (
    <header className="fixed w-full bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* App Name / Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-yellow-400 to-green-600 hover:from-yellow-500 hover:to-green-700 
            transition-all duration-300"
          >
            Blogit
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center text-gray-300 hover:text-yellow-500 
            transition-colors duration-300 group"
          >
            <HomeIcon
              className="mr-2 text-gray-400 group-hover:text-yellow-500 
              transition-colors duration-300"
              size={20}
            />
            Home
          </Link>
          {accessToken && (
            <Link
              to="/my-posts"
              className="flex items-center text-gray-300 hover:text-yellow-500 
            transition-colors duration-300 group"
            >
              <PostIcon
                className="mr-2 text-gray-400 group-hover:text-yellow-500 
              transition-colors duration-300"
                size={20}
              />
              My Posts
            </Link>
          )}
        </nav>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {accessToken && (
            <div className="flex items-center text-gray-300">
              <UserIcon className="mr-2 text-gray-400" size={20} />
              <span>{username}</span>
            </div>
          )}
          {accessToken ? (
            <button
              onClick={onLogout}
              className="flex items-center bg-gradient-to-r from-yellow-500 to-green-600 
            text-white px-3 py-2 rounded-md hover:from-yellow-600 hover:to-green-700 
            transition-all duration-300 transform hover:scale-105 group"
            >
              <LogOutIcon
                className="mr-2 text-white group-hover:rotate-6 
              transition-transform duration-300"
                size={20}
              />
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center bg-gradient-to-r from-yellow-500 to-green-600 
            text-white px-3 py-2 rounded-md hover:from-yellow-600 hover:to-green-700 
            transition-all duration-300 transform hover:scale-105 group"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

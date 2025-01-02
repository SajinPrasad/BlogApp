import React from "react";
import { Route, Routes } from "react-router-dom";

import Registration from "../Auth/Registration";
import Login from "../Auth/Login";
import Home from "../Home/Home";
import PostFullView from "../Home/PostFullView";
import MyPosts from "../Home/MyPosts";

const Approuter = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<PostFullView />} />
        <Route path="/my-posts" element={<MyPosts />} />
      </Routes>
    </>
  );
};

export default Approuter;

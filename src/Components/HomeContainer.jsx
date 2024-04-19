import React, { useEffect, useState } from "react";
import SideProfile from "./SideProfile";
import FriendsRequestBox from "./FriendsRequestBox";
import FriendsSuggestionBox from "./FriendsSuggestionBox";
import FriendsBox from "./FriendsBox";
import CreatePostBox from "./CreatePostBox";
import PostContainer from "./PostContainer";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const HomeContainer = () => {
  const { loginUser } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <>
      {loginUser ? (
        <div className="flex md:grid md:grid-cols-9 gap-x-4 my-4 w-full">
          <div className="col-span-2 hidden md:flex flex-col gap-3">
            <SideProfile />
            <FriendsBox />
          </div>
          <div className="col-span-5 flex flex-col gap-[10px] w-full">
            {location.pathname === "/" && <CreatePostBox user={loginUser} />}
            <PostContainer />
          </div>
          <div className="col-span-2 hidden md:flex flex-col gap-4">
            <FriendsRequestBox />
            <FriendsSuggestionBox />
          </div>
        </div>
      ) : (
        <div className="flex md:grid md:grid-cols-9 gap-x-4 my-4 relative">
          <div className="col-span-2 hidden md:flex flex-col gap-3">
            <div className="skeleton h-96 p-4 py-3  w-full"></div>
            <div className="skeleton h-44 p-4 py-3  w-full"></div>
          </div>
          <div className="col-span-5 flex flex-col gap-[10px] w-full">
            <div className="skeleton h-28 p-4 py-3  w-full"></div>
            <div className="skeleton h-28 p-4 py-3  w-full"></div>
            <div className="skeleton h-28 p-4 py-3  w-full"></div>
            <div className="skeleton h-28 p-4 py-3  w-full"></div>
            <div className="skeleton h-28 p-4 py-3  w-full"></div>
          </div>
          <div className="col-span-2 hidden md:flex flex-col gap-4">
            <div className="skeleton h-36 p-4 py-3  w-full"></div>
            <div className="skeleton h-72 p-4 py-3  w-full"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeContainer;

import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { BsBriefcase } from "react-icons/bs";
import PostCard from "./PostCard";
import moment from "moment";
import { useSelector } from "react-redux";
const PostProfile = () => {
  const [postComment, setPostComment] = useState(null);
  //get the profile user from global store
  const profileUser = useSelector((state) => state?.user?.profileUser);

  const {
    profession,
    location,
    verified,
    createdAt,
    instagramURL,
    facebookURL,
    twitterURL,
    about,
  } = profileUser?.user;
  const { posts } = profileUser;
  return (
    <>
      <div className="flex flex-col md:flex-row gap-5">
        {/* Side Profile */}
        <div className="bg-zinc-950 rounded-lg shadow-xl p-4 py-3 w-full md:w-1/4 h-fit">
          <div className="flex flex-col gap-2 py-3 border-b-[1px] border-zinc-900">
            <div className="flex flex-col gap-1 pb-3 border-b-[1px] border-zinc-900">
              <h1 className="text-xl font-semibold">About</h1>
              <p className="text-ascent-2 text-sm font-semibold">
                {about === "" ? "Write about yourself" : about}
              </p>
            </div>
            <div className="flex flex-row gap-[3px] items-center text-ascent-2 text-sm font-semibold">
              <SlLocationPin />
              <p>{location ? location : "Add Location"}</p>
            </div>
            <div className="flex flex-row gap-[5px] items-center text-ascent-2 text-sm font-semibold">
              <BsBriefcase />
              <p>{profession ? profession : "No Profession"}</p>
            </div>
          </div>
          <div className="flex flex-col py-3 border-b-[1px] border-zinc-900 gap-1">
            <h1 className="text-base font-semibold">3 Friends</h1>
            <h1 className="text-[13px] font-semibold text-blue">
              {verified ? "Verified" : "Not Verified"} Account
            </h1>
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-sm font-medium text-ascent-2">Joined</h1>
              <p className="text-sm font-semibold ">
                {moment(createdAt).fromNow()}
              </p>
            </div>
          </div>
          <div className="flex flex-col py-3 gap-[6px]">
            <h1 className="text-[15px] font-semibold">Social Profile</h1>
            <div className="flex flex-row gap-[3px] items-center text-ascent-2 text-sm font-semibold hover:text-blue">
              <FaInstagram />
              <a
                href={
                  instagramURL === ""
                    ? "https://www.instagram.com"
                    : instagramURL
                }
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
            <div className="flex flex-row gap-[3px] items-center text-ascent-2 text-sm font-semibold hover:text-blue">
              <FaSquareXTwitter />
              <a
                href={twitterURL === "" ? "https://twitter.com/" : twitterURL}
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </div>
            <div className="flex flex-row gap-[3px] items-center text-ascent-2 text-sm font-semibold hover:text-blue">
              <FaSquareFacebook />
              <a
                href={
                  facebookURL === "" ? "https://www.facebook.com/" : facebookURL
                }
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
        {/* Post Container */}
        <div className="h-full flex flex-col gap-2 w-full md:w-3/4 ">
          {posts?.length === 0 ? (
            <h1 className="text-2xl font-semibold text-ascent-2 bg-zinc-950 py-20 text-center">
              No Post added!
            </h1>
          ) : (
            <>
              {posts?.map((curr, index) => {
                return (
                  <PostCard
                    post={curr}
                    key={index}
                    postComment={postComment}
                    setPostComment={setPostComment}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PostProfile;

import React, { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import {
  FaSquareFacebook,
  FaSquareGithub,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { SlLocationPin } from "react-icons/sl";
import { BsBriefcase } from "react-icons/bs";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import PostCard from "./PostCard";
import moment from "moment";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import GetUsername from "../utils/GetUsername";
import { gfgStats, githubStats, leetcodeStats } from "../utils/APIRequest";
const PostProfile = () => {
  const [postComment, setPostComment] = useState(null);
  //get the profile user from global store
  const profileUser = useSelector((state) => state?.user?.profileUser);
  const [gfgStat, setGfgStat] = useState(null);
  const [leetcodeStat, setLeetcodeStat] = useState(null);
  const [githubStat, setGithubStat] = useState(null);
  const {
    profession,
    location,
    verified,
    createdAt,
    instagramURL,
    facebookURL,
    linkedinURL,
    githubURL,
    leetcodeURL,
    gfgURL,
    about,
  } = profileUser?.user;
  const { posts } = profileUser;

  const getLeetcodeStat = async () => {
    const username = GetUsername(leetcodeURL);
    const stats = await leetcodeStats(username);
    setLeetcodeStat(stats);
  };
  const getGfgStat = async () => {
    const username = GetUsername(gfgURL);
    const stats = await gfgStats(username);
    setGfgStat(stats);
  };
  const getGithubStat = async () => {
    const username = GetUsername(githubURL);
    const stats = await githubStats(username);
    setGithubStat(stats);
  };

  useEffect(() => {
    if (githubURL) {
      getGithubStat();
    }
  }, []);
  useEffect(() => {
    if (gfgURL) {
      getGfgStat();
    }
  }, []);
  useEffect(() => {
    if (leetcodeURL) {
      getLeetcodeStat();
    }
  }, []);
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
          <div className="flex flex-col py-3 gap-2 border-b-[1px] border-zinc-900">
            <h1 className="text-[15px] font-semibold">Social Profile</h1>
            <div className="grid grid-cols-2 justify-between gap-3">
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
                <FaSquareFacebook />
                <a
                  href={
                    facebookURL === ""
                      ? "https://www.facebook.com/"
                      : facebookURL
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </div>
              {linkedinURL !== "" && (
                <div className="flex flex-row gap-[3px] items-center text-ascent-2 text-sm font-semibold hover:text-blue">
                  <FaLinkedin />
                  <a href={linkedinURL} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </div>
              )}
              {githubURL !== "" && (
                <div className="flex flex-row gap-[3px] items-center text-ascent-2 text-sm font-semibold hover:text-blue">
                  <FaSquareGithub />
                  <a href={githubURL} target="_blank" rel="noreferrer">
                    Github
                  </a>
                </div>
              )}
              {leetcodeURL !== "" && (
                <div className="flex flex-row gap-[3px] items-center text-ascent-2 text-sm font-semibold hover:text-blue">
                  <SiLeetcode />
                  <a
                    href={
                      leetcodeURL === "" ? "https://leetcode.com/" : leetcodeURL
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    Leetcode
                  </a>
                </div>
              )}
              {gfgURL !== "" && (
                <div className="flex flex-row gap-[3px] items-center text-ascent-2 text-sm font-semibold hover:text-blue">
                  <SiGeeksforgeeks />
                  <a
                    href={
                      gfgURL === "" ? "https://www.geeksforgeeks.org/" : gfgURL
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    GeeksForGeeks
                  </a>
                </div>
              )}
            </div>
          </div>
          {leetcodeStat && (
            <div className="flex flex-col py-3 gap-2 border-b-[1px] border-zinc-900">
              <h1 className="text-[16px] font-semibold pb-1">Leetcode Stats</h1>
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-row gap-[3px] items-center text-gray-300 text-sm font-semibold justify-evenly">
                  <div style={{ width: 85, height: 85 }}>
                    <CircularProgressbar
                      value={
                        (
                          leetcodeStat?.problemSolvedCount[0].count /
                          leetcodeStat?.totalProblems
                        ).toFixed(2) * 100
                      }
                      text={`${leetcodeStat?.problemSolvedCount[0].count} 
                      Solved`}
                      styles={buildStyles({
                        textSize: "14px",
                        pathColor: "rgb(6,90,216)",
                        textColor: "white",
                        trailColor: "rgb(40,40,40)",
                        strokeWidth: 4,
                      })}
                    />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <p className="text-gray-300 text-sm font-semibold">
                      Easy :{" "}
                      <span className="text-gray-400 text-sm">
                        {leetcodeStat?.problemSolvedCount[1].count}
                      </span>
                    </p>
                    <p className="text-gray-300 text-sm font-semibold">
                      Medium :{" "}
                      <span className="text-gray-400 text-sm">
                        {leetcodeStat?.problemSolvedCount[2].count}
                      </span>
                    </p>
                    <p className="text-gray-300 text-sm font-semibold">
                      Hard :{" "}
                      <span className="text-gray-400 text-sm">
                        {leetcodeStat?.problemSolvedCount[3].count}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-[3px] items-center text-gray-300 text-sm font-semibold">
                    📊
                    <p>
                      Ranking :{" "}
                      <span className="text-gray-300 text-sm">
                        {leetcodeStat?.ranking}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-row gap-[3px] items-center text-gray-300 text-sm font-semibold">
                    🥇
                    <p>
                      Badges :{" "}
                      <span className="text-gray-400 text-sm">
                        {leetcodeStat?.badges}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {gfgStat && (
            <div className="flex flex-col py-3 gap-2 border-b-[1px] border-zinc-900">
              <h1 className="text-[16px] font-semibold pb-1">
                GeeksForGeeks Stats
              </h1>
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-row gap-[3px] items-center text-gray-300 text-sm font-semibold justify-evenly">
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      value={(2929 / gfgStat.total_problems_solved).toFixed(2)}
                      text={`${gfgStat.total_problems_solved} Solved`}
                      styles={buildStyles({
                        textSize: "14px",
                        pathColor: "rgb(6,90,216)",
                        textColor: "white",
                        trailColor: "rgb(40,40,40)",
                        strokeWidth: 4,
                      })}
                    />
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    <p className="text-gray-300 text-sm font-semibold">
                      School :{" "}
                      <span className="text-gray-400 text-sm">
                        {gfgStat.School}
                      </span>
                    </p>
                    <p className="text-gray-300 text-sm font-semibold">
                      Basic :{" "}
                      <span className="text-gray-400 text-sm">
                        {gfgStat.Basic}
                      </span>
                    </p>
                    <p className="text-gray-300 text-sm font-semibold">
                      Easy :{" "}
                      <span className="text-gray-400 text-sm">
                        {gfgStat.Easy}
                      </span>
                    </p>
                    <p className="text-gray-300 text-sm font-semibold">
                      Medium :{" "}
                      <span className="text-gray-400 text-sm">
                        {gfgStat.Medium}
                      </span>
                    </p>
                    <p className="text-gray-300 text-sm font-semibold">
                      Hard :{" "}
                      <span className="text-gray-400 text-sm">
                        {gfgStat.Hard}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-row flex-wrap justify-between gap-[10px] pt-1">
                  <div className="flex flex-row gap-[3px] items-center text-gray-300 text-sm font-semibold">
                    📊
                    <p>
                      Institute Ranking :{" "}
                      <span className="text-gray-300 text-sm">
                        {gfgStat?.institute_rank}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-row gap-[3px] items-center text-gray-300 text-sm font-semibold">
                    🎯
                    <p>
                      Score :{" "}
                      <span className="text-gray-400 text-sm">
                        {gfgStat.score}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-row gap-[3px] items-center text-gray-300 text-sm font-semibold">
                    <p>
                      Institute Name :{" "}
                      <span className="text-gray-400 text-sm">
                        {gfgStat.institute_name}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {githubStat && (
            <div className="flex flex-col py-3 gap-2 border-b-[1px] border-zinc-900">
              <h1 className="text-[16px] font-semibold pb-1">Github Stats</h1>
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-row flex-wrap justify-between gap-[10px] pt-1">
                  <div className="flex flex-row gap-[3px] items-center text-gray-300 text-sm font-semibold">
                    👨🏻‍💻
                    <p>
                      Followers:
                      <span className="text-gray-300 text-sm">
                        {githubStat.followers}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-row gap-[3px] items-center text-gray-300 text-sm font-semibold">
                    👩🏻‍💻
                    <p>
                      Following :{" "}
                      <span className="text-gray-400 text-sm">
                        {githubStat.following}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-row gap-[3px] items-center text-gray-300 text-sm font-semibold">
                    <RiGitRepositoryPrivateLine />
                    <p>
                      Repository :{" "}
                      <span className="text-gray-400 text-sm">
                        {githubStat.repos}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
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

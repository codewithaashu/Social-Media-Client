import React, { useState } from "react";
import NoProfilePic from "../assests/userprofile.png";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import moment from "moment";
import { likeCommentReply } from "../utils/APIRequest";
import { useSelector } from "react-redux";
const ReplyCard = ({
  replied: { userId, reply, createdAt, likes, _id },
  index,
  lastIndex,
}) => {
  const { loginUser } = useSelector((state) => state?.user);
  const [like, setLike] = useState({
    likes: likes.includes(loginUser._id),
    likeCount: likes.length,
  });
  const handleLike = async () => {
    const { likeCount, likes } = await likeCommentReply(_id);
    setLike({ likeCount, likes });
  };
  return (
    <>
      <div
        className={`${
          lastIndex === index ? "border-b-0" : "border-b-[1px]"
        } border-zinc-900 py-2 flex flex-row gap-2`}
      >
        <img
          src={userId?.profileUrl ?? NoProfilePic}
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col gap-0">
          <h1 className="text-sm font-semibold">
            {userId.firstName + " " + userId.lastName}
          </h1>
          <p className="text-xs font-semibold text-ascent-2">
            {moment(createdAt).fromNow()}
          </p>
          <p className="text-sm font-medium text-gray-300 py-1">{reply}</p>
          <div className="flex flex-row gap-3">
            <div
              className="flex flex-row gap-1 items-center text-ascent-2 text-[13px] font-semibold cursor-pointer"
              onClick={handleLike}
            >
              {like.likes ? (
                <AiFillLike className="text-[15px] text-blue" />
              ) : (
                <AiOutlineLike className="text-[15px]" />
              )}
              <p>
                {like.likeCount === 0 ? "0 Like" : like.likeCount + " Likes"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReplyCard;

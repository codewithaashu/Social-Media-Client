import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import NoProfilePic from "../assests/userprofile.png";
import moment from "moment";
import CommentBox from "./CommentBox";
import { deletePost, likePost } from "../utils/APIRequest";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmAlertModal from "./ConfirmAlertModal";
import { setRefresh } from "../Redux/RefreshSlice";

const PostCard = ({ post, postComment, setPostComment }) => {
  const [fullDescription, setFullDescription] = useState(false);
  //get the login user from global store
  const loginUser = useSelector((state) => state?.user?.loginUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const { refresh } = useSelector((state) => state.refresh);
  const [like, setLike] = useState({
    likes: post.likes.includes(loginUser._id),
    likeCount: post.likes.length,
  });
  const navigate = useNavigate();

  const handleLike = async () => {
    //like post
    const { likeCount, likes } = await likePost(post._id);
    setLike({ likeCount, likes });
  };

  const handleConfirm = async (onClose) => {
    const success = await deletePost(post._id);
    if (success) {
      dispatch(setRefresh(!refresh));
      onClose();
    }
  };

  const handleDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmAlertModal
          heading={"Are you sure?"}
          title={"You want to delete this post?"}
          handleConfirm={() => handleConfirm(onClose)}
          onClose={onClose}
        />
      ),
    });
  };

  return (
    <>
      <div className="p-4 border-b-[1px] border-zinc-900 flex flex-col gap-3 bg-zinc-950 rounded-lg shadow-xl">
        <div className="flex flex-row justify-between items-center">
          <div
            className="flex flex-row gap-2 items-center cursor-pointer"
            onClick={() => navigate(`/profile/${post.userId._id}`)}
          >
            <img
              src={post.userId.profileUrl ?? NoProfilePic}
              alt="User Avatar"
              className="w-7 h-7 rounded-full object-cover"
            />
            <p className="text-sm font-semibold text-white">
              {post.userId.firstName + " " + post.userId.lastName}
            </p>
          </div>
          <h1 className="text-xs font-semibold text-ascent-2">
            {moment(post.createdAt).fromNow()}
          </h1>
        </div>
        <div
          onClick={() => navigate(`/post/${post._id}`, { state: post })}
          className="cursor-pointer flex flex-col gap-3"
        >
          <div className="text-ascent-2 text-sm font-medium ">
            {post.description.length > 250 ? (
              <>
                {fullDescription !== post._id ? (
                  <p>
                    {post.description.slice(0, 250)}
                    <span
                      className="text-[13px] font-semibold text-blue px-1 cursor-pointer"
                      onClick={() => setFullDescription(post._id)}
                    >
                      Show More
                    </span>
                  </p>
                ) : (
                  post.description
                )}
              </>
            ) : (
              post.description
            )}
          </div>
          {post.mediaSrc && (
            <img
              src={post.mediaSrc}
              alt="Post"
              className="rounded-lg w-full "
            />
          )}
        </div>
        <div className="flex flex-row justify-between mt-2">
          <div
            className="flex flex-row gap-1 items-center text-ascent-2 text-[13px] font-semibold cursor-pointer"
            onClick={handleLike}
          >
            {like.likes ? (
              <AiFillLike className="text-[15px] text-blue" />
            ) : (
              <AiOutlineLike className="text-[15px]" />
            )}
            <p>{like.likeCount === 0 ? "0 Like" : like.likeCount + " Likes"}</p>
          </div>
          <div
            className="flex flex-row gap-1 items-center text-ascent-2 text-[13px] font-semibold cursor-pointer"
            onClick={() =>
              setPostComment(postComment === post._id ? null : post._id)
            }
          >
            <BiComment className="text-sm" />
            <p>
              {post.comments.length === 0
                ? "0 Comment"
                : post.comments.length + " Comments"}
            </p>
          </div>
          {post.userId._id === loginUser._id && (
            <div
              className="flex flex-row gap-1 items-center text-ascent-2 text-[13px] font-semibold cursor-pointer"
              onClick={handleDelete}
            >
              <MdDelete className="text-sm" />
              <p>Delete</p>
            </div>
          )}
        </div>
        {location.pathname.includes("/post") ? (
          <CommentBox postId={post._id} setPostComment={setPostComment} />
        ) : (
          postComment === post._id && (
            <CommentBox postId={post._id} setPostComment={setPostComment} />
          )
        )}
      </div>
    </>
  );
};

export default PostCard;

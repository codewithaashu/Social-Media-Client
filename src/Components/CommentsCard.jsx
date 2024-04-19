import React, { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import ReplyCard from "./ReplyCard";
import {
  getCommentReplies,
  likeComment,
  repliedComment,
} from "../utils/APIRequest";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setRefresh } from "../Redux/RefreshSlice";
import EmojiPicker from "emoji-picker-react";
import { MdEmojiEmotions } from "react-icons/md";
const CommentsCard = ({
  comment: { userId, comment, likes, replies, _id, createdAt },
  index,
  lastIndex,
  replyComment,
  setReplyComment,
  showReplies,
  setShowReplies,
}) => {
  //get loginUser from redux global store
  const loginUser = useSelector((state) => state?.user?.loginUser);

  //get refresh value from redux global store
  const { refresh } = useSelector((state) => state?.refresh);
  const dispatch = useDispatch();

  const [like, setLike] = useState({
    likes: likes.includes(loginUser._id),
    likeCount: likes.length,
  });

  const [formData, setFormData] = useState({ reply: "", commentId: "" });
  const [allReplies, setAllReplies] = useState(null);
  const [emojiOpen, setEmojiOpen] = useState(false);

  const handleLike = async () => {
    //like post
    const { likeCount, likes } = await likeComment(_id);
    setLike({ likeCount, likes });
  };

  const handleReply = async () => {
    const success = await repliedComment(formData);
    if (success) {
      dispatch(setRefresh(!refresh));
      setFormData({ reply: "", commentId: _id });
      //to close the reply comment card
      setReplyComment(null);
    }
  };

  const handleGetReplies = async (id) => {
    setShowReplies(showReplies === _id ? null : _id);
    const resp = await getCommentReplies(id);
    setAllReplies(resp);
  };

  const handleEmojiSelect = (emoji) => {
    setFormData({
      ...formData,
      reply: formData.reply + emoji.emoji,
    });
  };

  return (
    <>
      <div
        className={`${
          lastIndex === index ? "border-b-0" : "border-b-[1px]"
        } border-zinc-900 py-2 flex flex-row gap-2`}
      >
        <img
          src={userId?.profileUrl}
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col gap-0 w-full">
          <h1 className="text-sm font-semibold">
            {userId.firstName + " " + userId.lastName}
          </h1>
          <p className="text-xs font-semibold text-ascent-2">
            {moment(createdAt).fromNow()}
          </p>
          <p className="text-sm font-medium text-gray-300 py-1">{comment}</p>
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
            <button
              className="text-xs text-blue"
              onClick={() => {
                setReplyComment(replyComment === _id ? null : _id);
                setFormData({ ...formData, commentId: _id });
              }}
            >
              Reply
            </button>
          </div>
          {replyComment === _id ? (
            <div className="flex flex-col gap-3 mt-4 mb-2 w-full">
              <div className="flex flex-row gap-3 items-center">
                <img
                  src={userId?.profileUrl}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex flex-row justify-between p-2 px-3 bg-black  rounded-xl relative w-full items-center">
                  <textarea
                    type="text"
                    value={formData.reply}
                    placeholder={`Reply ${
                      userId.firstName + " " + userId.lastName
                    }`}
                    className="flex-1 text-sm font-medium outline-none  bg-black rounded-xl placeholder:text-gray-500 text-gray-300 w-full border-0 resize-none  overflow-y-scroll"
                    onChange={(e) =>
                      setFormData({ ...formData, reply: e.target.value })
                    }
                    style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
                  ></textarea>
                  <MdEmojiEmotions
                    className="text-xl md:text-2xl cursor-pointer "
                    onClick={() => setEmojiOpen(!emojiOpen)}
                  />
                  <div className="absolute  bottom-11  right-6 z-10">
                    <EmojiPicker
                      open={emojiOpen}
                      rows={2}
                      perRow={8}
                      onEmojiClick={handleEmojiSelect}
                      emojiSize={32}
                      width={300}
                      height={350}
                    />
                  </div>
                </div>
              </div>
              <button
                className="self-end px-2 py-[2px] bg-blue rounded-xl text-[13px] font-semibold opacity-85"
                onClick={handleReply}
              >
                Submit
              </button>
            </div>
          ) : null}
          <div className="flex flex-col gap-2 py-2">
            {replies.length > 0 && (
              <>
                <h1
                  className="text-[13px] font-semibold cursor-pointer"
                  onClick={() => handleGetReplies(_id)}
                >
                  Show Replies({replies.length})
                </h1>
                {showReplies === _id && (
                  <div className="px-2">
                    {allReplies?.map((curr, index) => {
                      return (
                        <ReplyCard
                          replied={curr}
                          key={index}
                          index={index}
                          lastIndex={replies.length - 1}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsCard;

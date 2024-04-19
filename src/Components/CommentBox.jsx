import React, { useEffect, useState } from "react";
import CommentsCard from "./CommentsCard";
import { commentPost, getPostComments } from "../utils/APIRequest";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setRefresh } from "../Redux/RefreshSlice";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

const CommentBox = ({ postId, setPostComment }) => {
  const [replyComment, setReplyComment] = useState(null);
  const [showReplies, setShowReplies] = useState(null);
  const [formData, setFormData] = useState({ comment: "", postId });
  const [postComments, setPostComments] = useState(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  //get the state from global store
  const loginUser = useSelector((state) => state?.user?.loginUser);
  const dispatch = useDispatch();
  const { refresh } = useSelector((state) => state.refresh);

  const params = useParams();

  useEffect(
    () => async () => {
      if (params?.postId) {
        //get all comments
        const comments = await getPostComments(postId);
        setPostComments(comments);
      }
    },
    [formData, refresh]
  );

  const handleCommentPost = async () => {
    const success = await commentPost(formData);
    if (success) {
      dispatch(setRefresh(!refresh));
      setFormData({ comment: "", postId });
      setPostComment(null);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setFormData({
      ...formData,
      comment: formData.comment + emoji.emoji,
    });
  };

  return (
    <>
      <div className="mt-5 flex flex-col">
        {/* Create new comment input box */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3 items-center">
            <img
              src={loginUser.profileUrl}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex flex-row justify-between p-2 px-3 bg-black  rounded-xl relative w-full items-center">
              <textarea
                type="text"
                value={formData.comment}
                placeholder="Comment your post"
                className="flex-1 text-sm font-medium outline-none  bg-black rounded-xl placeholder:text-gray-500 text-gray-300 w-full border-0 resize-none  overflow-y-scroll"
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
              ></textarea>
              <MdEmojiEmotions
                className="text-xl md:text-2xl cursor-pointer "
                onClick={() => setEmojiOpen(!emojiOpen)}
              />
              <div className="absolute  top-[50px] right-3 z-10">
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
            onClick={handleCommentPost}
          >
            Submit
          </button>
        </div>
        {/* Comments Box */}
        {params?.postId && (
          <div className="flex flex-col gap-2">
            {postComments?.length === 0 ? (
              <h1 className="text-sm font-semibold text-gray-400 px-3 py-3">
                No Comments yet. Be the first to comment.
              </h1>
            ) : (
              <>
                {postComments?.map((curr, index) => {
                  return (
                    <CommentsCard
                      comment={curr}
                      key={index}
                      index={index}
                      lastIndex={postComments.length - 1}
                      replyComment={replyComment}
                      setReplyComment={setReplyComment}
                      showReplies={showReplies}
                      setShowReplies={setShowReplies}
                    />
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CommentBox;

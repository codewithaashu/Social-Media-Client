import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { fetchAllPosts, getPostDetails } from "../utils/APIRequest";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
const PostContainer = () => {
  const [postComment, setPostComment] = useState(null);
  const [posts, setPosts] = useState(null);
  const [post, setPost] = useState(null);
  const { refresh } = useSelector((state) => state.refresh);
  const location = useLocation();
  const { postId } = useParams();

  const handleAPI = async () => {
    if (location.pathname === "/") {
      const resp = await fetchAllPosts();
      setPosts(resp);
    } else {
      const result = await getPostDetails(postId);
      setPost(result);
    }
  };

  useEffect(() => {
    handleAPI();
    return () => {
      setPosts(null);
      setPost(null);
    };
  }, [refresh]);

  return (
    <>
      <div className="h-full flex flex-col gap-2">
        {location.pathname === "/" ? (
          <>
            {posts ? (
              <>
                {posts.map((curr, index) => {
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
            ) : (
              <div className="flex flex-col gap-[10px] w-full max-h-screen md:max-h-screen">
                <div className="skeleton min-h-[20vh] p-4 py-3  w-full"></div>
                <div className="skeleton min-h-[20vh] p-4 py-3  w-full"></div>
                <div className="skeleton min-h-[20vh] p-4 py-3  w-full"></div>
                <div className="skeleton min-h-[20vh] p-4 py-3  w-full"></div>
              </div>
            )}
          </>
        ) : post ? (
          <>
            <PostCard
              post={post}
              postComment={postComment}
              setPostComment={setPostComment}
            />
          </>
        ) : (
          <div className="skeleton min-h-[80vh] md:min-h-[85vh] p-4 py-3  w-full"></div>
        )}
      </div>
    </>
  );
};

export default PostContainer;

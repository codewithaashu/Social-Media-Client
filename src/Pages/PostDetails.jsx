import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import HomeContainer from "../Components/HomeContainer";

const PostDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full min-h-screen px-2 md:px-16 bg-black text-white mb-2 relative">
      <NavBar />
      <HomeContainer />
    </div>
  );
};

export default PostDetails;

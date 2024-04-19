import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import PostProfile from "./PostProfile";
import FriendsProfile from "./FriendsProfile";
import PhotosProfile from "./PhotosProfile";
import { useSelector } from "react-redux";

const ProfileContainer = () => {
  const [active, setActive] = useState("Posts");
  const profileUser = useSelector((state) => state?.user?.profileUser);

  const handleNavigation = () => {
    if (active === "Posts") {
      return <PostProfile />;
    } else if (active === "Friends") {
      return <FriendsProfile />;
    } else if (active === "Photos") {
      const photos = [];
      const userPhoto = profileUser?.user?.profileUrl;
      if (
        userPhoto !==
        "https://res.cloudinary.com/dycobmjyk/image/upload/v1711939908/Social%20Media/userprofile_ikl880.png"
      ) {
        photos.push(userPhoto);
      }
      for (let i = 0; i < profileUser?.posts?.length; i++) {
        const curr = profileUser?.posts[i];
        if (curr.mediaSrc) {
          photos.push(curr.mediaSrc);
        }
        continue;
      }
      return <PhotosProfile photos={photos} />;
    }
  };

  return (
    <>
      {profileUser ? (
        <div className="flex flex-col gap-2 my-4">
          <ProfileHeader active={active} setActive={setActive} />
          {handleNavigation()}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 my-4 max-h-[85vh] overflow-hidden">
            <div className="skeleton md:min-h-[70vh] min-h-[40vh] p-4 py-3  w-full"></div>
            <div className="flex flex-col md:flex-row gap-5 ">
              <div className="skeleton md:min-h-[15vh] min-h-[20vh] p-4 py-3 md:w-1/4 w-full"></div>
              <div className="skeleton p-4 py-3 md:min-h-[15vh] min-h-[20vh] md:w-3/4 w-full"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileContainer;

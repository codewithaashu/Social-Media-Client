import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import ProfileContainer from "../Components/ProfileContainer";
import { profileDetails } from "../utils/APIRequest";
import { visitProfile } from "../Redux/UserSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { refresh } = useSelector((state) => state.refresh);

  const handleAPI = async () => {
    //after fetching profile details,set profile to visited profile user
    const result = await profileDetails(id);
    //set profile in global store
    dispatch(visitProfile(result));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleAPI();
    return () => {
      dispatch(visitProfile(null));
    };
  }, [refresh, id]);

  return (
    <div className="w-full min-h-screen px-2 md:px-16 bg-black text-white mb-2 relative">
      <NavBar />
      <ProfileContainer />
    </div>
  );
};

export default Profile;

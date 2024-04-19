import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import HomeContainer from "../Components/HomeContainer";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../utils/APIRequest";
import { login } from "../Redux/UserSlice";
const Home = () => {
  const { refresh } = useSelector((state) => state.refresh);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Home | FunBook";
    window.scrollTo(0, 0);
    handleAPI();
  }, [refresh]);

  const handleAPI = async () => {
    // get  user from api
    const loginUser = await getUser();
    //set the login user in global store
    dispatch(login(loginUser));
  };

  return (
    <>
      <div className="w-full min-h-screen px-2 md:px-16 bg-black text-white mb-2 relative">
        <NavBar />
        <HomeContainer />
      </div>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { CiDark } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { logoutUser, searchUser } from "../utils/APIRequest";
import { Link, useNavigate } from "react-router-dom";
import { BsChatSquareDots } from "react-icons/bs";
import { SearchResultContainer } from "./SearchResultContainer";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const { loginUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (value) => {
    if (!value) {
      setSearchResult(null);
    }
    setSearchValue(value);
  };

  const handleLogout = async () => {
    await logoutUser();
  };

  const handleAPI = async () => {
    setSearchResult(null);
    const result = await searchUser(searchValue);
    setSearchResult(result?.filter((curr) => curr?._id !== loginUser._id));
  };

  useEffect(() => {
    const debouncing = setTimeout(() => {
      if (searchValue.length > 0) {
        handleAPI();
      }
    }, 1200);
    return () => {
      clearTimeout(debouncing);
    };
  }, [searchValue]);

  return (
    <>
      <div className="hidden md:flex justify-between bg-zinc-900 p-5 items-center ">
        <Logo />
        <div className="flex flex-col w-3/5 dropdown">
          <div className="flex flex-row border-2 rounded-lg border-zinc-900 w-full">
            <input
              type="text"
              placeholder="Search"
              className="text-sm font-medium outline-none p-2 py-3 bg-zinc-950 rounded-l-lg placeholder:text-gray-400 text-gray-300 w-full border-0"
              value={searchValue}
              onChange={(e) => handleChange(e.target.value)}
            />
            <button className="text-sm font-semibold bg-blue  py-1 px-4 rounded-r-lg">
              Search
            </button>
          </div>
          <SearchResultContainer
            searchResult={searchResult}
            searchValue={searchValue}
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-4">
          <div className="border-[1px] px-3 py-1 border-gray-800 rounded-lg bg-black cursor-pointer shadow-lg">
            <CiDark size={"22px"} />
          </div>
          <div
            className="border-[1px] px-3 py-2 border-gray-800 rounded-lg bg-black cursor-pointer"
            onClick={() => navigate("/chats")}
          >
            <BsChatSquareDots size={"18px"} />
          </div>
          <Link
            className="border-[1px] px-3 py-1 border-gray-800 rounded-lg bg-black cursor-pointer"
            to="/login"
            onClick={handleLogout}
          >
            <IoLogOutOutline size={"22px"} />
          </Link>
        </div>
      </div>
      <div className="flex md:hidden flex-col gap-3 bg-zinc-900 p-3">
        <div className="flex justify-between">
          <Logo />
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="border-[1px] px-3 py-1 border-gray-800 rounded-lg bg-black cursor-pointer shadow-lg">
              <CiDark size={"22px"} />
            </div>
            <div
              className="border-[1px] px-3 py-1 border-gray-800 rounded-lg bg-black cursor-pointer"
              onClick={() => navigate("/chats")}
            >
              <BsChatSquareDots size={"22px"} />
            </div>
            <Link
              className="border-[1px] px-3 py-1 border-gray-800 rounded-lg bg-black cursor-pointer"
              to="/login"
              onClick={handleLogout}
            >
              <IoLogOutOutline size={"22px"} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full dropdown">
          <div className="flex flex-row border-2 rounded-lg border-zinc-900 w-full">
            <input
              type="text"
              placeholder="Search"
              className="text-sm font-medium outline-none p-2 py-3 bg-zinc-950 rounded-l-lg placeholder:text-gray-400 text-gray-300 w-full border-0"
              value={searchValue}
              onChange={(e) => handleChange(e.target.value)}
            />
            <button className="text-sm font-semibold bg-blue  py-1 px-4 rounded-r-lg">
              Search
            </button>
          </div>
          <SearchResultContainer
            searchResult={searchResult}
            searchValue={searchValue}
          />
        </div>
      </div>
    </>
  );
};

export default NavBar;

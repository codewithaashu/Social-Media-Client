import React, { useState } from "react";
import FriendsCard from "./FriendsCard";
import { useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
const FriendsProfile = () => {
  const { friends } = useSelector((state) => state?.user?.profileUser)?.user;
  const [active, setActive] = useState("All Friends");
  const { location, profession } = useSelector(
    (state) => state?.user?.profileUser
  )?.user;
  const [friendList, setFriendList] = useState(friends);

  const handleNavigate = (tab) => {
    setActive(tab);
    if (tab === "All Friends") {
      setFriendList(friends);
    } else if (tab === "City") {
      const filterFriendList = friends?.filter(
        (curr) => curr?.location === location
      );
      setFriendList(filterFriendList);
    } else if (tab === "Profession") {
      const filterFriendList = friends?.filter(
        (curr) => curr?.profession === profession
      );
      setFriendList(filterFriendList);
    }
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setActive("All Friends");
    const filterFriendList = friends?.filter((curr) => {
      return (
        curr.firstName.toLowerCase().includes(search.toLowerCase()) ||
        curr.lastName.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFriendList(filterFriendList);
  };

  return (
    <>
      <div className="p-4 border-b-[1px] border-zinc-900 flex flex-col gap-3 bg-zinc-950 rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row  justify-between w-full md:w-11/12 gap-3">
          <h1 className="text-xl font-semibold">
            Friends ({friendList?.length})
          </h1>
          <div className="flex flex-row items-center bg-zinc-800 px-2 p-1 rounded-md text-zinc-300 gap-2 text-base w-full md:w-fit">
            <IoSearch className="text-base" />
            <input
              type="text"
              className="outline-none bg-transparent text-zinc-300 w-full"
              placeholder="Search your friend"
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </div>
        {/* Navigation */}
        <div className="flex flex-row gap-4  p-3 md:px-7">
          <h1
            className={`text-[17px] font-semibold px-2 pb-2 pt-1
            hover:bg-zinc-900 hover:text-ascent-2 hover:rounded-md cursor-pointer
            ${
              active === "All Friends"
                ? "text-blue border-b-2 border-blue hover:rounded-none hover:bg-transparent hover:text-blue"
                : "text-ascent-2"
            } `}
            onClick={() => handleNavigate("All Friends")}
          >
            All Friends
          </h1>

          <h1
            className={`text-[17px] font-semibold px-2 pt-1 pb-2 hover:bg-zinc-900 hover:text-ascent-2 hover:rounded-md cursor-pointer ${
              active === "City"
                ? "text-blue border-b-2 border-blue hover:rounded-none hover:bg-transparent hover:text-blue"
                : "text-ascent-2"
            } `}
            onClick={() => handleNavigate("City")}
          >
            City
          </h1>
          <h1
            className={`text-[17px] font-semibold px-2 pt-1 pb-2 hover:bg-zinc-900 hover:text-ascent-2 hover:rounded-md cursor-pointer ${
              active === "Profession"
                ? "text-blue border-b-2 border-blue hover:rounded-none hover:bg-transparent hover:text-blue"
                : "text-ascent-2"
            } `}
            onClick={() => handleNavigate("Profession")}
          >
            Profession
          </h1>
        </div>
        {/*FriendsContainer  */}
        {friendList.length === 0 ? (
          <h1 className="text-2xl font-semibold text-ascent-2 bg-zinc-950 py-10 text-center">
            No Friends
          </h1>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-y-10 p-5">
              {friendList.map((friend, index) => {
                return <FriendsCard key={index} friend={friend} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FriendsProfile;

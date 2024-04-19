import React from "react";
import { useNavigate } from "react-router-dom";

const FriendsCard = ({
  friend: { profileUrl, profession, location, _id, firstName, lastName },
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row gap-5 items-center w-full">
        <img
          src={profileUrl}
          alt="Avatar"
          className="w-16 h-16 md:w-28 md:h-28 rounded-lg cursor-pointer"
          onClick={() => {
            navigate(`/profile/${_id}`);
          }}
        />
        <div>
          <h1
            className="text-base font-bold leading-5 hover:underline cursor-pointer"
            onClick={() => {
              navigate(`/profile/${_id}`);
            }}
          >
            {firstName + " " + lastName}
          </h1>
          <p className="text-sm font-semibold text-ascent-2">
            {location === "" ? "No location" : location}
          </p>
          <p className="text-sm font-semibold text-ascent-2">
            {profession === "" ? "No Profession" : profession}
          </p>
        </div>
        <div className="w-10 min-h-10 object-cover rounded-full hover:bg-zinc-800 cursor-pointer text-center mx-auto">
          <h1 className="text-lg font-extrabold text-gray-400 ">...</h1>
        </div>
      </div>
    </>
  );
};

export default FriendsCard;

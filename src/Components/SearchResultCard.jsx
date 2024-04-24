import React from "react";
import { useNavigate } from "react-router-dom";

const SearchResultCard = ({ user }) => {
  const navigate = useNavigate();
  const { firstName, lastName, _id, profileUrl, profession } = user;
  return (
    <>
      <div className="flex flex-row gap-[6px]  items-center py-[10px] border-b-[1px] border-zinc-900">
        <img
          src={profileUrl}
          alt="Search User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col font-semibold text-sm">
          <h1
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/profile/" + _id)}
          >
            {firstName + " " + lastName}
          </h1>
          <p className="text-ascent-2 text-xs">
            {profession ? profession : "No Profession"}
          </p>
        </div>
      </div>
    </>
  );
};

export default SearchResultCard;

import React from "react";
import NoProfilePic from "../assests/userprofile.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const FriendsBox = () => {
  const navigate = useNavigate();
  const { loginUser } = useSelector((state) => state?.user);
  const { _id, friends } = loginUser;
  return (
    <>
      <div className="bg-zinc-950 rounded-lg shadow-xl p-4 py-3">
        <div className="flex flex-row justify-between font-semibold pb-1 border-b-[1px] border-zinc-900">
          <h1 className="text-[15px] text-gray-300">Friends</h1>
          <p className="text-sm">{friends.length}</p>
        </div>
        <div className="flex flex-col gap-4 py-3">
          {friends.length === 0 ? (
            <h1 className="text-sm font-semibold text-gray-200 text-center">
              0 Friends. Connect with people to see their posts.
            </h1>
          ) : (
            <>
              {friends.slice(0, 10).map((curr, index) => {
                const { firstName, lastName, profileUrl, profession, _id } =
                  curr;
                return (
                  <div
                    to={profileUrl}
                    className="flex flex-row gap-[6px] cursor-pointer"
                    key={index}
                    onClick={() => navigate(`/profile/${_id}`)}
                  >
                    <img
                      src={profileUrl ?? NoProfilePic}
                      alt="Friend Avatar"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col font-semibold text-sm">
                      <h1>{firstName + " " + lastName}</h1>
                      <p className="text-ascent-2 text-xs">
                        {profession === "" ? "No Profession" : profession}
                      </p>
                    </div>
                  </div>
                );
              })}
              {friends.length >= 10 && (
                <Link
                  to={`/profile/${_id}`}
                  className="text-[13px] font-semibold text-blue hover:underline"
                >
                  See More
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FriendsBox;

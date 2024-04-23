import React, { useEffect, useState } from "react";
import NoProfilePic from "../assests/userprofile.png";
import { acceptRequest, getFriendRequestList } from "../utils/APIRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../Redux/RefreshSlice";
import { setFriendRequests } from "../Redux/UserSlice";
const FriendsRequestBox = () =>
  // { refresh, setRefresh }

  {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { refresh } = useSelector((state) => state.refresh);
    const { friendRequests } = useSelector((state) => state.user);
    useEffect(
      () => async () => {
        const resp = await getFriendRequestList();
        dispatch(setFriendRequests(resp));
      },
      [refresh]
    );

    const handleFriendRequest = async (requestStatus, requestId) => {
      const success = await acceptRequest(requestId, requestStatus);
      if (success) {
        // setRefresh(!refresh);
        dispatch(setRefresh(!refresh));
      }
    };

    return (
      <>
        <div className="bg-zinc-950 rounded-lg shadow-xl p-4 py-3">
          <div className="flex flex-row justify-between font-semibold pb-1 border-b-[1px] border-zinc-900">
            <h1 className="text-[15px] text-gray-300">Friend Request</h1>
            <p className="text-sm">{friendRequests?.length}</p>
          </div>
          <div className="flex flex-col gap-5 py-3 min-h-10">
            {friendRequests?.length === 0 ? (
              <h1 className="text-sm font-semibold text-gray-200 text-center">
                No Friend Request
              </h1>
            ) : (
              <>
                {friendRequests?.map((curr, index) => {
                  const { profileUrl, profession, firstName, lastName, _id } =
                    curr.requestFrom;
                  return (
                    <div
                      className="flex flex-row justify-between items-center"
                      key={index}
                    >
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
                            {profession ?? "No Profession"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2">
                        <button
                          className="text-xs font-semibold bg-blue rounded-lg p-[5px]"
                          onClick={() =>
                            handleFriendRequest("Accept", curr._id)
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="text-xs font-semibold bg-black border-[1px] border-gray-700 rounded-lg p-[5px]"
                          onClick={() => handleFriendRequest("Deny", curr._id)}
                        >
                          Deny
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </>
    );
  };

export default FriendsRequestBox;

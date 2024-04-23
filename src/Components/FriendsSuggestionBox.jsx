import React, { useEffect, useState } from "react";
import NoProfilePic from "../assests/userprofile.png";
import { FaUserPlus, FaUserCheck } from "react-icons/fa6";
import {
  getFriendSuggestList,
  getRequestList,
  sendFriendRequest,
} from "../utils/APIRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../Redux/RefreshSlice";
import { setRequestList } from "../Redux/UserSlice";
const FriendsSuggestionBox = () => {
  const [suggestFriends, setSuggestFriends] = useState(null);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refresh } = useSelector((state) => state.refresh);
  const { requestList } = useSelector((state) => state.user);

  useEffect(
    () => async () => {
      const suggestPeople = await getFriendSuggestList();
      setSuggestFriends(suggestPeople);
      const result = await getRequestList();
      dispatch(setRequestList(result));
    },
    [refresh]
  );

  const handleFriendRequest = async (id) => {
    const success = await sendFriendRequest({ requestTo: id });
    if (success) {
      dispatch(setRefresh(!refresh));
    }
  };

  return (
    <>
      <div className="bg-zinc-950 rounded-lg shadow-xl p-4 py-3">
        <div className="flex flex-row justify-between font-semibold pb-1 border-b-[1px] border-zinc-900">
          <h1 className="text-[15px] text-gray-300">Friend Suggestion</h1>
          {suggestFriends && <p className="text-sm">{suggestFriends.length}</p>}
        </div>
        <div className="flex flex-col gap-5 py-3">
          {suggestFriends ? (
            <>
              {suggestFriends.length === 0 ? (
                <h1 className="text-sm font-semibold text-gray-200 text-center">
                  No Friend Suggestion
                </h1>
              ) : (
                <>
                  {suggestFriends.map((curr, index) => {
                    const { profileUrl, profession, firstName, lastName, _id } =
                      curr;
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
                            className="text-[15px] font-semibold text-blue"
                            onClick={() => handleFriendRequest(_id)}
                            disabled={requests.some(
                              (curr) => curr.requestTo === _id
                            )}
                          >
                            {requestList.some(
                              (curr) => curr.requestTo === _id
                            ) ? (
                              <FaUserCheck />
                            ) : (
                              <FaUserPlus />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <div className="w-full flex justify-center items-center">
              <div className="loader "></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FriendsSuggestionBox;

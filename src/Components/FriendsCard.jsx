import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMinus } from "react-icons/fa";
import { unfriendUser } from "../utils/APIRequest";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/UserSlice";
import { setRefresh } from "../Redux/RefreshSlice";
import { confirmAlert } from "react-confirm-alert";
import ConfirmAlertModal from "./ConfirmAlertModal";
import { setChat } from "../Redux/ChatSlice";

const FriendsCard = ({
  friend: { profileUrl, profession, location, _id, firstName, lastName },
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refresh } = useSelector((state) => state.refresh);
  const { chat } = useSelector((state) => state.chat);
  const { loginUser, profileUser } = useSelector((state) => state.user);
  const handleConfirm = async (onClose) => {
    const res = await unfriendUser(_id);
    if (res) {
      dispatch(setRefresh(!refresh));
      dispatch(setChat(null));
      dispatch(login(res));
      onClose();
    }
  };
  const handleUnfriend = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmAlertModal
          heading={"Are you sure?"}
          title={`You want to unfriend ${firstName + " " + lastName}?`}
          handleConfirm={() => handleConfirm(onClose)}
          onClose={onClose}
        />
      ),
    });
  };
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
        {loginUser._id === profileUser?.user?._id && (
          <FaUserMinus
            className="text-lg font-extrabold text-gray-400 mx-auto cursor-pointer"
            onClick={handleUnfriend}
          />
        )}
      </div>
    </>
  );
};

export default FriendsCard;

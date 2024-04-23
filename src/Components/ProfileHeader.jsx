import React, { useEffect, useState } from "react";
import { IoCamera } from "react-icons/io5";
import { FaUserEdit, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  UpdateUser,
  acceptRequest,
  cancelRequest,
  getFriendRequestList,
  getRequestList,
  sendFriendRequest,
  unfriendUser,
  uploadMedia,
} from "../utils/APIRequest";
import EditModalContainer from "./EditModalContainer";
import { setRefresh } from "../Redux/RefreshSlice";
import {
  login,
  setFriendRequests,
  setRequestList,
  updateProfile,
} from "../Redux/UserSlice";
import { confirmAlert } from "react-confirm-alert";
import ConfirmAlertModal from "./ConfirmAlertModal";
import { FaUserXmark } from "react-icons/fa6";
import { setChat } from "../Redux/ChatSlice";
const ProfileHeader = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = useSelector((state) => state?.user?.loginUser);
  const { friendRequests, requestList } = useSelector((state) => state.user);
  const profileUser = useSelector((state) => state?.user?.profileUser);
  const { refresh } = useSelector((state) => state.refresh);
  const { profileUrl, firstName, lastName, friends, _id, coverPhoto } =
    profileUser?.user;

  const [imgLoading, setImgLoading] = useState({
    profileUrl: false,
    coverPhoto: false,
  });
  const [openModal, setOpenModal] = useState(false);

  const handleChangeProfilePicture = async (file, type) => {
    //if file size is larger
    if (file?.size > 10485760) {
      return;
    }
    //otherwise upload
    setImgLoading({ ...imgLoading, [type]: true });
    //upload image on cloudinary
    const imageURL = await uploadMedia(file);
    //update user with profile image
    const result = await UpdateUser({ [type]: imageURL });
    if (result) {
      //update loginUser in redux global store
      dispatch(updateProfile(result));
      //refresh the page
      dispatch(setRefresh(!refresh));
    }
    setImgLoading({ ...imgLoading, [type]: false });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleConfirm = async (onClose, type) => {
    if (type === "unfriend") {
      const res = await unfriendUser(_id);
      if (res) {
        dispatch(setRefresh(!refresh));
        dispatch(setChat(null));
        dispatch(login(res));
        onClose();
      }
    } else {
      const res = await cancelRequest(_id);
      if (res) {
        dispatch(setRequestList(res));
        onClose();
      }
    }
  };

  const handleUnfriend = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmAlertModal
          heading={"Are you sure?"}
          title={`You want to unfriend ${firstName + " " + lastName}?`}
          handleConfirm={() => handleConfirm(onClose, "unfriend")}
          onClose={onClose}
        />
      ),
    });
  };

  const handleRequestSend = async (id) => {
    const success = await sendFriendRequest({
      requestTo: profileUser?.user?._id,
    });
    if (success) {
      const result = await getRequestList();
      dispatch(setRequestList(result));
      dispatch(setRefresh(!refresh));
    }
  };

  const handleFriendRequest = async (requestStatus, requestId) => {
    const success = await acceptRequest(requestId, requestStatus);
    if (success) {
      const resp = await getFriendRequestList();
      dispatch(setFriendRequests(resp));
      dispatch(setRefresh(!refresh));
    }
  };

  const handleCancelRequest = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmAlertModal
          heading={"Are you sure?"}
          title={`Cancel friend request of ${firstName + " " + lastName}?`}
          handleConfirm={() => handleConfirm(onClose, "cancelRequest")}
          onClose={onClose}
        />
      ),
    });
  };

  return (
    <>
      <div className="bg-zinc-950">
        {/*Background image  */}
        <div className="h-36 md:h-60 relative rounded-b-md w-full flex justify-center items-center">
          {imgLoading.coverPhoto ? (
            <div className="mediaUploadLoader self-center"></div>
          ) : (
            <>
              <img
                src={coverPhoto}
                alt="Background"
                className="h-full w-full object-cover "
              />
              {loginUser?._id === _id && (
                <label className="absolute bottom-2 right-2 cursor-pointer text-sm bg-white p-[6px] px-2 rounded-md text-black font-semibold hover:bg-gray-100 shadow-md">
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg, .jpeg, .png,.avif"
                    onChange={(e) =>
                      handleChangeProfilePicture(
                        e.target.files[0],
                        "coverPhoto"
                      )
                    }
                  />
                  <p className="flex items-center gap-1">
                    <span>
                      <IoCamera className="text-lg" />
                    </span>
                  </p>
                </label>
              )}
            </>
          )}
        </div>

        {/*Header  */}
        <div className="flex flex-col md:flex-row justify-between   mx-7 -mt-2 md:-mt-4 pb-5 border-b-[1px] border-zinc-900">
          <div className="flex flex-row gap-3 items-center">
            <div className="h-24 w-24 md:h-40 md:w-40 rounded-full object-cover relative flex items-center justify-center   p-1 bg-white">
              {imgLoading.profileUrl ? (
                <div className="mediaUploadLoader self-center"></div>
              ) : (
                <>
                  <img
                    src={profileUrl}
                    alt="Avatar"
                    className="h-full w-full rounded-full"
                  />
                  {loginUser?._id === _id && (
                    <label className="absolute bottom-3 bg-gray-300 right-0 cursor-pointer text-sm  p-1 rounded-full text-black font-semibold hover:bg-gray-100 shadow-md">
                      <input
                        type="file"
                        className="hidden"
                        accept=".jpg, .jpeg, .png,.avif"
                        onChange={(e) =>
                          handleChangeProfilePicture(
                            e.target.files[0],
                            "profileUrl"
                          )
                        }
                      />
                      <IoCamera className=" text-lg w-4 h-4 md:w-6 md:h-6  object-cover" />
                    </label>
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl md:text-[26px] font-bold text-white leading-5">
                {firstName + " " + lastName}
              </h1>
              <p className="text-ascent-2 text-base font-semibold">
                {friends.length} {friends.length === 0 ? "friend" : "friends"}
              </p>
              <div className="hidden md:flex flex-row mt-1 ">
                {friends?.map((curr, index) => {
                  const { profileUrl, _id } = curr;
                  return (
                    <img
                      src={profileUrl}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover cursor-pointer"
                      onClick={() => {
                        navigate("/profile/" + _id);
                        setRefresh(!refresh);
                      }}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 self-end ">
            {loginUser?._id === _id && (
              <>
                <button
                  className="text-sm md:text-[15px] font-semibold p-[6px] px-3 rounded-md bg-zinc-100  text-black flex gap-1 items-center hover:bg-zinc-200"
                  onClick={handleOpenModal}
                >
                  <span>
                    <FaUserEdit />
                  </span>
                  Edit Profile
                </button>
                <button className="text-[15px] font-semibold p-[6px] px-3 rounded-md bg-zinc-100  text-black flex gap-1 items-center hover:bg-zinc-200">
                  <IoMdSettings />
                </button>
              </>
            )}
            {friendRequests?.some(
              (curr) =>
                curr.requestTo === loginUser._id &&
                curr?.requestFrom?._id === profileUser?.user?._id
            ) && (
              <>
                <button
                  className="text-[15px] font-semibold p-[6px] px-3 rounded-md bg-blue text-white   flex gap-1 items-center "
                  onClick={() =>
                    handleFriendRequest(
                      "Accept",
                      friendRequests?.find(
                        (curr) => curr.requestTo === loginUser._id
                      )?._id
                    )
                  }
                >
                  Accept
                </button>
                <button
                  className="text-[15px] font-semibold p-[6px] px-3 rounded-md bg-black border-[1px] border-gray-700  text-white flex gap-1 items-center "
                  onClick={() =>
                    handleFriendRequest(
                      "Deny",
                      friendRequests?.find(
                        (curr) => curr.requestTo === loginUser._id
                      )?._id
                    )
                  }
                >
                  Deny
                </button>
              </>
            )}
            {loginUser?.friends?.some((curr) => curr?._id === _id) && (
              <button
                className="text-sm md:text-[15px] font-semibold p-[6px] px-3 rounded-md bg-zinc-100  text-black flex gap-1 items-center hover:bg-zinc-200"
                onClick={handleUnfriend}
              >
                <span>
                  <FaUserMinus />
                </span>
                Unfriend
              </button>
            )}
            {loginUser?.friends?.every((curr) => curr?._id !== _id) &&
              loginUser._id !== _id &&
              !friendRequests?.some(
                (curr) =>
                  curr.requestTo === loginUser._id &&
                  curr?.requestFrom?._id === profileUser?.user?._id
              ) &&
              !requestList?.some(
                (curr) => curr?.requestTo === profileUser?.user?._id
              ) && (
                <button
                  className="text-sm md:text-[15px] font-semibold p-[6px] px-3 rounded-md bg-zinc-100  text-black flex gap-1 items-center hover:bg-zinc-200"
                  onClick={handleRequestSend}
                >
                  <span>
                    <FaUserPlus />
                  </span>
                  Add Friend
                </button>
              )}
            {requestList?.some(
              (curr) => curr?.requestTo === profileUser?.user?._id
            ) && (
              <button
                className="text-sm md:text-[15px] font-semibold p-[6px] px-3 rounded-md bg-zinc-100  text-black flex gap-1 items-center hover:bg-zinc-200"
                onClick={handleCancelRequest}
              >
                <span>
                  <FaUserXmark />
                </span>
                Cancel Request
              </button>
            )}
          </div>
        </div>

        {/* Navigation Box */}
        <div className="flex flex-row gap-4 bg-zinc-950 p-3 px-7">
          <h1
            className={`text-[17px] font-semibold px-2 pb-2 pt-1
            hover:bg-zinc-900 hover:text-ascent-2 hover:rounded-md cursor-pointer
            ${
              active === "Posts"
                ? "text-blue border-b-2 border-blue hover:rounded-none hover:bg-transparent hover:text-blue"
                : "text-ascent-2"
            } `}
            onClick={() => setActive("Posts")}
          >
            Posts
          </h1>
          <h1
            className={`text-[17px] font-semibold px-2 pt-1 pb-2 hover:bg-zinc-900 hover:text-ascent-2 hover:rounded-md cursor-pointer ${
              active === "Friends"
                ? "text-blue border-b-2 border-blue hover:rounded-none hover:bg-transparent hover:text-blue"
                : "text-ascent-2"
            } `}
            onClick={() => setActive("Friends")}
          >
            Friends
          </h1>
          <h1
            className={`text-[17px] font-semibold px-2 pt-1 pb-2 hover:bg-zinc-900 hover:text-ascent-2 hover:rounded-md cursor-pointer ${
              active === "Photos"
                ? "text-blue border-b-2 border-blue hover:rounded-none hover:bg-transparent hover:text-blue"
                : "text-ascent-2"
            } `}
            onClick={() => setActive("Photos")}
          >
            Photos
          </h1>
        </div>
      </div>
      <EditModalContainer openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default ProfileHeader;

import React, { useState } from "react";
import InputComponent from "./InputComponent";
import BtnComponent from "./BtnComponent";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { UpdateUser, uploadMedia } from "../utils/APIRequest";
import { updateProfile } from "../Redux/UserSlice";
import { IoCamera } from "react-icons/io5";
import ValidateField from "../utils/ValidateField";
import { setRefresh } from "../Redux/RefreshSlice";
const EditModalContainer = ({ openModal, setOpenModal }) => {
  //fetch user
  const loginUser = useSelector((state) => state?.user?.loginUser);
  const { refresh } = useSelector((state) => state.refresh);
  const dispatch = useDispatch();
  //destructure the field of loginUser
  const {
    profileUrl,
    firstName,
    lastName,
    instagramURL,
    facebookURL,
    linkedinURL,
    githubURL,
    leetcodeURL,
    gfgURL,
    profession,
    location,
    _id,
    about,
  } = loginUser;
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    profession,
    location,
    instagramURL,
    facebookURL,
    linkedinURL,
    githubURL,
    leetcodeURL,
    gfgURL,
    profileUrl,
    about,
  });

  const [errorFormData, setErrorFormData] = useState({
    firstName: true,
    lastName: true,
    profession: true,
    location: true,
    instagramURL: true,
    facebookURL: true,
    linkedinURL: true,
    githubURL: true,
    leetcodeURL: true,
    gfgURL: true,
    profileUrl: true,
    about: true,
  });
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const handleImageUpload = async (e) => {
    //if file size is larger
    if (e.target.files[0]?.size > 10485760) {
      return;
    }
    //otherwise upload
    setImgLoading(true);
    const imageURL = await uploadMedia(e.target.files[0]);
    setFormData({ ...formData, profileUrl: imageURL });
    setImgLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const result = await UpdateUser(formData);
    setLoading(false);
    if (result) {
      //update loginUser in redux global store
      dispatch(updateProfile(result));
      //refresh the page
      dispatch(setRefresh(!refresh));
      //close modal
      setOpenModal(false);
    }
  };

  return (
    <>
      <div
        className={`bg-[#000000c1]  absolute top-0 left-0 w-full h-full 
       ${
         !openModal ? "hidden" : "flex"
       }  justify-center px-[10px] md:px-16 py-5 z-10`}
      >
        <div
          className=" bg-black  px-[10px] md:px-5 py-8 w-full md:w-1/2 rounded-md max-h-screen overflow-y-scroll scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex justify-between">
            <h1 className="text-white text-lg font-semibold mb-4">
              Edit Profile
            </h1>
            <RxCross2
              className="text-xl font-bold cursor-pointer"
              onClick={() => setOpenModal(false)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-16 w-16 md:h-24 md:w-24 rounded-full object-cover relative flex items-center justify-center   p-1 bg-white self-center">
              {imgLoading ? (
                <div className="mediaUploadLoader self-center"></div>
              ) : (
                <>
                  <img
                    src={formData.profileUrl}
                    alt="Avatar"
                    className="h-full w-full rounded-full"
                  />

                  <label className="absolute bottom-3 bg-gray-300 right-0 cursor-pointer text-sm  p-1 rounded-full text-black font-semibold hover:bg-gray-100 shadow-md">
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg, .jpeg, .png,.avif"
                      onChange={(e) => handleImageUpload(e)}
                    />
                    <IoCamera className=" text-lg w-2 h-2 md:w-4 md:h-4  object-cover" />
                  </label>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InputComponent
                label={"First Name"}
                inputType={"text"}
                placeholder={"First name"}
                field={"firstName"}
                formData={formData}
                setFormData={setFormData}
                errorFormData={errorFormData}
                setErrorFormData={setErrorFormData}
              />
              <InputComponent
                label={"Last Name"}
                inputType={"text"}
                placeholder={"Last name"}
                field={"lastName"}
                formData={formData}
                setFormData={setFormData}
                errorFormData={errorFormData}
                setErrorFormData={setErrorFormData}
              />
              <InputComponent
                label={"Profession"}
                inputType={"text"}
                placeholder={"Type your profession here.."}
                field={"profession"}
                formData={formData}
                setFormData={setFormData}
                isValidate={true}
                errorFormData={errorFormData}
                setErrorFormData={setErrorFormData}
              />
              <InputComponent
                label={"Location"}
                inputType={"text"}
                placeholder={"Enter your location"}
                field={"location"}
                formData={formData}
                setFormData={setFormData}
                isValidate={true}
                errorFormData={errorFormData}
                setErrorFormData={setErrorFormData}
              />
              <InputComponent
                label={"Instagram Profile"}
                inputType={"url"}
                placeholder={"Paste your Instagram Profile URL here..."}
                field={"instagramURL"}
                formData={formData}
                setFormData={setFormData}
                isValidate={true}
                errorFormData={errorFormData}
                setErrorFormData={setErrorFormData}
              />
              <InputComponent
                label={"Facebook Profile"}
                inputType={"url"}
                placeholder={"Paste your Facebook Profile URL here..."}
                field={"facebookURL"}
                formData={formData}
                setFormData={setFormData}
                isValidate={true}
                errorFormData={errorFormData}
                setErrorFormData={setErrorFormData}
              />
              <InputComponent
                label={"LinkedIn Profile"}
                inputType={"url"}
                placeholder={"Paste your LinkedIn Profile URL here..."}
                field={"linkedinURL"}
                formData={formData}
                setFormData={setFormData}
                isValidate={true}
                errorFormData={errorFormData}
                setErrorFormData={setErrorFormData}
              />
              <InputComponent
                label={"Github Profile"}
                inputType={"url"}
                placeholder={"Paste your Github Profile URL here..."}
                field={"githubURL"}
                formData={formData}
                setFormData={setFormData}
                isValidate={true}
                errorFormData={errorFormData}
                setErrorFormData={setErrorFormData}
              />
              <InputComponent
                label={"Leetcode Profile"}
                inputType={"url"}
                placeholder={"Paste your Leetcode Profile URL here..."}
                field={"leetcodeURL"}
                formData={formData}
                setFormData={setFormData}
                isValidate={true}
                errorFormData={errorFormData}
                setErrorFormData={setErrorFormData}
              />
              <InputComponent
                label={"GeeksForGeeks Profile"}
                inputType={"url"}
                placeholder={"Paste your GeeksForGeeks Profile URL here..."}
                field={"gfgURL"}
                formData={formData}
                setFormData={setFormData}
                isValidate={true}
                errorFormData={errorFormData}
                setErrorFormData={setErrorFormData}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-[15px] font-bold text-ascent-2">About Me</h1>
              <textarea
                value={formData.about}
                onChange={(e) => {
                  setErrorFormData({
                    ...errorFormData,
                    about: ValidateField(e.target.value, "about"),
                  });
                  setFormData({ ...formData, about: e.target.value });
                }}
                placeholder="Type about yourself here..."
                className="resize-none  text-sm font-medium outline-none p-2 py-3 rounded-md bg-zinc-700 placeholder:text-gray-400 text-gray-300 w-full"
              ></textarea>
              {typeof errorFormData["about"] === "string" && (
                <p className="text-xs font-semibold text-red-600 w-full px-1 -mt-1 -mb-3">
                  {errorFormData["about"]}
                </p>
              )}
            </div>
            <div className="w-fit self-end">
              <BtnComponent
                label={"Submit"}
                handleBtn={handleSubmit}
                loading={loading}
                active={
                  Object.keys(errorFormData).every(
                    (curr) => errorFormData[curr] === true
                  ) && !imgLoading
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModalContainer;

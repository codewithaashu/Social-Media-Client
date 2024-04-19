import React, { useEffect, useState } from "react";
import InputComponent from "../Components/InputComponent";
import BtnComponent from "../Components/BtnComponent";
import { sendPasswordResetOTP } from "../utils/APIRequest";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errorFormData, setErrorFormData] = useState({
    email: null,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Reset Password | FunBook";
  }, []);
  const handleForgot = async () => {
    setLoading(true);
    const success = await sendPasswordResetOTP(formData.email);
    setLoading(false);
    if (success) {
      navigate(`/reset-password/${formData.email}`);
      setFormData({ email: "" });
    }
  };
  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-black text-white">
        <div className="bg-zinc-900 py-8 px-4 flex flex-col gap-2 w-[320px] md:w-[360px]">
          <h1 className="text-xl font-bold">Email Address</h1>
          <p className="text-sm text-gray-400">
            Enter email address used during registration
          </p>
          <div className="pt-4">
            <InputComponent
              label={""}
              placeholder={"Enter your email address here"}
              field={"email"}
              inputType={"email"}
              formData={formData}
              setFormData={setFormData}
              errorFormData={errorFormData}
              setErrorFormData={setErrorFormData}
            />
          </div>
          <div className="mt-3">
            <BtnComponent
              label={"Submit"}
              handleBtn={handleForgot}
              loading={loading}
              active={Object.keys(errorFormData).every(
                (curr) => errorFormData[curr] === true
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

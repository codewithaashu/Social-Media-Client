import React, { useState } from "react";
import BtnComponent from "../Components/BtnComponent";
import InputComponent from "../Components/InputComponent";
import { Link, useParams } from "react-router-dom";
import { errorToast } from "../utils/Toast";
import { resetPassword } from "../utils/APIRequest";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const [formData, setFormData] = useState({
    OTP: "",
    password: "",
    cPassword: "",
  });
  const [errorFormData, setErrorFormData] = useState({
    cPassword: null,
    password: null,
    OTP: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email } = useParams();
  const handleChangePassword = async () => {
    const { password, cPassword, OTP } = formData;
    if (password !== cPassword) {
      return errorToast("Passwords are not same");
    }
    const success = await resetPassword({ OTP, password, email });
    if (success) {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-black text-white">
        <div className="bg-zinc-900 py-8 px-4 flex flex-col gap-2 w-[320px] md:w-[360px]">
          <h1 className="text-xl font-bold">Reset Password</h1>
          <div className="pt-4 flex flex-col gap-4">
            <InputComponent
              label={"One Time Password(OTP)"}
              placeholder={"Enter OTP here..."}
              field={"OTP"}
              inputType={"number"}
              formData={formData}
              setFormData={setFormData}
              errorFormData={errorFormData}
              setErrorFormData={setErrorFormData}
            />
            <InputComponent
              label={"New Password"}
              placeholder={"Enter new password here..."}
              field={"password"}
              inputType={"password"}
              formData={formData}
              setFormData={setFormData}
              errorFormData={errorFormData}
              setErrorFormData={setErrorFormData}
            />
            <InputComponent
              label={"Confirm Password"}
              placeholder={"Enter password again..."}
              field={"cPassword"}
              inputType={"password"}
              formData={formData}
              setFormData={setFormData}
              errorFormData={errorFormData}
              setErrorFormData={setErrorFormData}
            />
          </div>
          <BtnComponent
            label={"Submit"}
            handleBtn={handleChangePassword}
            loading={loading}
            active={Object.keys(errorFormData).every(
              (curr) => errorFormData[curr] === true
            )}
          />
          <Link
            to="/forgot-password"
            className="text-[13px] font-semibold text-blue text-end mt-1"
          >
            Resend OTP?
          </Link>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

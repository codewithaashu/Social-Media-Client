import React, { useState } from "react";
import Logo from "./Logo";
import InputComponent from "./InputComponent";
import BtnComponent from "./BtnComponent";
import { Link } from "react-router-dom";
import { errorToast } from "../utils/Toast";
import { RegisterUser } from "../utils/APIRequest";
import { useNavigate } from "react-router-dom";
const RegisterBox = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [errorFormData, setErrorFormData] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    cPassword: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    //check password and confirm password are same or not
    //if it is not same
    if (formData.password !== formData.cPassword) {
      return errorToast("Password are not same");
    }
    //if it is same then registered the user
    setLoading(true); //loading true
    const success = await RegisterUser(formData);
    setLoading(false); // loading false
    //if things gone be success then redirect to login page
    if (success) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cPassword: "",
      });
      navigate("/login", { replace: true });
    }
  };
  return (
    <>
      <div className="px-5 md:px-8 py-20 bg-zinc-900 rounded-r-md shadow-md w-[320px] md:w-[360px]">
        <Logo />
        <h1 className="text-base font-semibold py-2">Create your account</h1>
        <div className="flex flex-col gap-3 pt-5">
          <div className="flex gap-3">
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
          </div>
          <InputComponent
            label={"Email Address"}
            inputType={"text"}
            placeholder={"Enter your email address"}
            field={"email"}
            formData={formData}
            setFormData={setFormData}
            errorFormData={errorFormData}
            setErrorFormData={setErrorFormData}
          />
          <div className="grid grid-cols-2 gap-2">
            <InputComponent
              label={"Password"}
              inputType={"password"}
              placeholder={"Password"}
              field={"password"}
              formData={formData}
              setFormData={setFormData}
              errorFormData={errorFormData}
              setErrorFormData={setErrorFormData}
            />
            <InputComponent
              label={"Confirm Password"}
              inputType={"password"}
              placeholder={"Confirm password"}
              field={"cPassword"}
              formData={formData}
              setFormData={setFormData}
              errorFormData={errorFormData}
              setErrorFormData={setErrorFormData}
            />
          </div>
        </div>
        <BtnComponent
          label={"Create Account"}
          handleBtn={handleRegister}
          loading={loading}
          active={Object.keys(errorFormData).every(
            (curr) => errorFormData[curr] === true
          )}
        />
        <div className="text-[13px] text-gray-400 font-semibold pt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue text-sm">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterBox;

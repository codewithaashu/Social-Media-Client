import React from "react";
import ValidateField from "../utils/ValidateField";

const InputComponent = ({
  label,
  inputType,
  placeholder,
  field,
  formData,
  setFormData,
  isValidate = false,
  errorFormData,
  setErrorFormData,
}) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="text-[15px] font-semibold text-ascent-2">{label}</h1>
        <input
          type={inputType}
          placeholder={placeholder}
          className="text-sm font-medium outline-none p-2 py-3 rounded-md bg-zinc-700 placeholder:text-gray-400 text-gray-300 w-full"
          value={formData[field]}
          onChange={(e) => {
            setErrorFormData({
              ...errorFormData,
              [field]: isValidate ? true : ValidateField(e.target.value, field),
            });
            setFormData({ ...formData, [field]: e.target.value });
          }}
        />
        {typeof errorFormData[field] === "string" && (
          <p className="text-xs font-semibold text-red-600 w-full px-1 -mt-1 -mb-3">
            {errorFormData[field]}
          </p>
        )}
      </div>
    </>
  );
};

export default InputComponent;

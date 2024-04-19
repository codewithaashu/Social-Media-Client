import React from "react";

const ConfirmAlertModal = ({ heading, title, handleConfirm, onClose }) => {
  return (
    <>
      <div className="custom-ui bg-black rounded-md p-5 py-8  text-white shadow-md w-80 flex flex-col gap-1">
        <h1 className="text-lg font-semibold">{heading}</h1>
        <p className="text-sm font-medium ">{title}</p>
        <div className="flex flex-row justify-between mt-5">
          <button
            onClick={handleConfirm}
            className="text-sm text-white bg-blue rounded-sm p-2 font-semibold w-16"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="text-sm text-white bg-red-600 rounded-sm p-2 font-semibold w-16"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmAlertModal;

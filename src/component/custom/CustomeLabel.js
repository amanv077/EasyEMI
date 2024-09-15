import React from "react";

const CustomeLabel = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor} // Link the label to the input with the same id
      className="text-gray-700 font-semibold mb-2 cursor-pointer"
    >
      {children}
    </label>
  );
};

export default CustomeLabel;

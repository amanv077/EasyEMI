import React from "react";

const CustomeButton = ({ children, ...props }) => {
  return (
    <button
      className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 active:scale-95 transition-transform duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomeButton;

// import React from "react";
// import CustomeLabel from "./CustomeLabel";

// const CustomeInput = ({ label, id, placeholder, ...props }) => {
//   return (
//     <div className="flex flex-col mb-4">
//       {label && <CustomeLabel htmlFor={id}>{label}</CustomeLabel>}{" "}
//       {/* Link the label with input */}
//       <input
//         id={id} // Set the id for linking
//         className="px-4 py-3 text-base border-2 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white hover:border-blue-400 placeholder-gray-500 text-gray-900"
//         placeholder={placeholder || ""}
//         {...props}
//       />
//     </div>
//   );
// };

// export default CustomeInput;

import React from "react";
import CustomeLabel from "./CustomeLabel";

const CustomeInput = ({ label, id, placeholder, ...props }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <CustomeLabel htmlFor={id} className="mb-1">
          {label}
        </CustomeLabel>
      )}
      <input
        id={id}
        className="px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300 bg-white hover:border-blue-400 placeholder-gray-500 text-gray-900"
        placeholder={placeholder || ""}
        {...props}
      />
    </div>
  );
};

export default CustomeInput;

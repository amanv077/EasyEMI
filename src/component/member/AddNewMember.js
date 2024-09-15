import React from "react";
import CustomeInput from "../custom/CustomInput";

const AddNewMember = () => {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Add New Member
      </h1>
      <form className="space-y-6">
        <CustomeInput
          label="Full Name"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
        />
        <CustomeInput
          label="Email"
          id="Email"
          name="Email"
          placeholder="Enter your Email"
        />
        <CustomeInput
          label="Mobile No."
          id="mobileNumber"
          name="mobileNumber"
          placeholder="Enter your Mobile No."
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewMember;

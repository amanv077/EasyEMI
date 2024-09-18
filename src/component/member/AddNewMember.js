import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CustomeInput from "../custom/CustomInput";

const AddNewMember = ({ addMember }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [status, setStatus] = useState("Inactive");
  const [message, setMessage] = useState(""); // State for success or error message
  const [error, setError] = useState(false); // State to handle error
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName && email && mobileNumber) {
      // Basic validation
      const newUuid = uuidv4(); // Generate a new UUID
      addMember(newUuid, fullName, email, mobileNumber, status);
      setMessage("Member added successfully!");
      setError(false);

      // Clear form after submission
      setStatus("Inactive");
      setFullName("");
      setEmail("");
      setMobileNumber("");

      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setMessage("Please fill in all fields.");
      setError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Add New Member
      </h1>

      {/* Display success or error message */}
      {message && (
        <div
          className={`text-center p-3 ${
            error ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <CustomeInput
          label="Full Name"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <CustomeInput
          label="Email"
          id="email"
          name="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomeInput
          label="Mobile No."
          id="mobileNumber"
          name="mobileNumber"
          placeholder="Enter your Mobile No."
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
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

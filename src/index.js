import App from "./App";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import AddNewMember from "./component/member/AddNewMember";
import Dashboard from "./component/homepage/HomePage";
import ContactUs from "./component/ExtraPages/ContactUs";
import Team from "./component/ExtraPages/Team";
import Features from "./component/ExtraPages/Features";
import MarketPlace from "./component/ExtraPages/MarketPlace";
import Company from "./component/ExtraPages/Company";
import MemberProfile from "./component/member/MemberProfile";

// Function to add a new member
const addMember = (uuid, name, email, number, status) => {
  const members = JSON.parse(localStorage.getItem("members")) || [];
  members.push({ uuid, name, email, number, status });
  localStorage.setItem("members", JSON.stringify(members));
};

// Define the router with the AddNewMember component receiving addMember as a prop
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout as the root element
    children: [
      {
        index: true,
        element: <App />, // Render App at the root path
      },
      {
        path: "dashboard", // Corrected the path to avoid conflict with the root path
        element: <Dashboard addMember={addMember} />, // Example of a child route
      },
      {
        path: "newmember",
        element: <AddNewMember addMember={addMember} />, // Pass addMember as a prop
      },
      {
        path: "company",
        element: <Company />,
      },
      {
        path: "marketplace",
        element: <MarketPlace />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "memberprofile/:uuid",
        element: <MemberProfile />, // Add this route
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// index.js
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

//add new member function

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
        path: "/",
        element: <Dashboard />, // Example of a child route
      },

      {
        path: "newmember",
        element: <AddNewMember />, // Example of a child route
      },
      {
        path: "/company",
        element: <Company />,
      },
      {
        path: "/marketplace",
        element: <MarketPlace />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

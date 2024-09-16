// index.js
import App from "./App";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import AddNewMember from "./component/member/AddNewMember";
import Dashboard from "./component/homepage/HomePage";

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
        element: (
          <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Company Info
              </h1>
              <p className="text-2xl text-gray-600">Coming Soon</p>
            </div>
          </div>
        ), // Example of a child route
      },
      {
        path: "/marketplace",
        element: (
          <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Marketplace
              </h1>
              <p className="text-2xl text-gray-600">Coming Soon</p>
            </div>
          </div>
        ), // Example of a child route
      },
      {
        path: "/features",
        element: (
          <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Features
              </h1>
              <p className="text-2xl text-gray-600">Coming Soon</p>
            </div>
          </div>
        ), // Example of a child route
      },
      {
        path: "/team",
        element: (
          <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Team</h1>
              <p className="text-2xl text-gray-600">Coming Soon</p>
            </div>
          </div>
        ), // Example of a child route
      },
      {
        path: "/contact",
        element: (
          <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact</h1>
              <p className="text-2xl text-gray-600">Coming Soon</p>
            </div>
          </div>
        ), // Example of a child route
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

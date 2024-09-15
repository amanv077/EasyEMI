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
        path: "contact",
        element: <div>Contact Page</div>, // Example of a child route
      },
      {
        path: "newmember",
        element: <AddNewMember />, // Example of a child route
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

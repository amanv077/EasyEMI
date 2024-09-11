// index.js
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";

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
        path: "about",
        element: <div>About Page</div>, // Example of a child route
      },
      {
        path: "contact",
        element: <div>Contact Page</div>, // Example of a child route
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

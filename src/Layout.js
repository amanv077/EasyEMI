// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";

function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

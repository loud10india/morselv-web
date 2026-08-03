import React from "react";
import Header from "../home/Header";
import { Outlet } from "react-router-dom";
import GetEmailSection from "../home/GetEmailSection";
import Footer from "../home/Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
function Layout() {
  return (
    <div className="font-sans w-full bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <GetEmailSection />
      <Footer/>
      <FloatingWhatsApp />
    </div>
  );
}

export default Layout;

import React, { Suspense } from "react";
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
        {/* Pages are loaded on demand (see App.jsx). The placeholder holds the
            footer below the fold while a page's code arrives. */}
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <GetEmailSection />
      <Footer/>
      <FloatingWhatsApp />
    </div>
  );
}

export default Layout;

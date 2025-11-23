import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import HomePage from "./components/home/HomePage";
import DealsSlider from "./components/deals/DealsSlider";
import Aboutus from "./components/home/Aboutus";
import Careers from "./components/home/Career";
import HelpAndSupport from "./components/home/HelpandSupport";
import Faq from "./components/home/Faq";
import PrivacyPolicy from "./components/home/PrivacyPolicy";
import TermsAndConditions from "./components/home/TermsandConditions";
import DealDetail from "./components/deals/DealDetail";
import ServiceListing from "./components/service/ServiceListing";
import ServiceDetail from "./components/service/ServiceDetail";
import Layout from "./components/utils/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Layout wrapper */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="deals" element={<DealsSlider />} />
            <Route path="deals/:category" element={<DealsSlider />} />
            <Route
              path="deals/:category/:subcategory"
              element={<DealsSlider />}
            />
            <Route path="deal/:slug/:dealID" element={<DealDetail />} />
            <Route path="AboutUS" element={<Aboutus />} />
            <Route path="Careers" element={<Careers />} />
            <Route path="HelpAndSupport" element={<HelpAndSupport />} />
            <Route path="faq" element={<Faq />} />
            <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="TermsAndConditions" element={<TermsAndConditions />} />
            {/* <Route path="service" element={<ServiceListing />} />
            <Route path="service/:category" element={<ServiceListing />} /> */}
            <Route
              path="service/:category?/:subcategory?"
              element={<ServiceListing />}
            />
            <Route
              path="provider/:slug/:providerID"
              element={<ServiceDetail />}
            />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;

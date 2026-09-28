import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import NotFound from "./components/utils/NotFound";
import Layout from "./components/utils/Layout";

// One chunk per page type, so a visitor downloads the code for the page they
// are on rather than for the whole site. Each pre-rendered page preloads its
// own chunk (scripts/prerender.mjs), so this adds no extra round trip; the
// loading boundary is in Layout, which keeps the header and footer in place.
const HomePage = lazy(() => import("./components/home/HomePage"));
const DealsSlider = lazy(() => import("./components/deals/DealsSlider"));
const Aboutus = lazy(() => import("./components/home/Aboutus"));
const Careers = lazy(() => import("./components/home/Career"));
const ListYourBusiness = lazy(() => import("./components/home/ListYourBusiness"));
const Packages = lazy(() => import("./components/home/Packages"));
const CustomerPanel = lazy(() => import("./components/home/CustomerPanel"));
const JobOpportunities = lazy(() => import("./components/home/JobOpportunities"));
const HelpAndSupport = lazy(() => import("./components/home/HelpandSupport"));
const Faq = lazy(() => import("./components/home/Faq"));
const PrivacyPolicy = lazy(() => import("./components/home/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./components/home/TermsandConditions"));
const DealDetail = lazy(() => import("./components/deals/DealDetail"));
const ServiceListing = lazy(() => import("./components/service/ServiceListing"));
const ServiceDetail = lazy(() => import("./components/service/ServiceDetail"));
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
            <Route path="ListYourBusiness" element={<ListYourBusiness />} />
            <Route path="packages" element={<Packages />} />
            <Route path="customer-panel" element={<CustomerPanel />} />
            <Route path="job-opportunities" element={<JobOpportunities />} />
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
            {/* Catch-all: an unmatched path used to render nothing at all. */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;

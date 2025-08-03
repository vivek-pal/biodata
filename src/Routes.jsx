import React from "react";
import { HashRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import HelpPage from "./pages/help";
import TermsAndConditions from "./pages/policy";
import Payment from "./pages/payment";
import ProfilePreference from "./pages/profilepreference/profilepreference";

const Routes = () => {
  return (
    <HashRouter>
      <RouterRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/policy" element={<TermsAndConditions />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profilepreference" element={<ProfilePreference />} />
      </RouterRoutes>
    </HashRouter>
  );
};

export default Routes;

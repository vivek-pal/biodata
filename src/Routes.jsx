import React from "react";
import { HashRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import HelpPage from "./pages/help";
import TermsAndConditions from "./pages/policy";
import Payment from "./pages/payment";

const Routes = () => {
  return (
    <HashRouter>
      <RouterRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/policy" element={<TermsAndConditions />} />
        <Route path="/payment" element={<Payment />} />
      </RouterRoutes>
    </HashRouter>
  );
};

export default Routes;

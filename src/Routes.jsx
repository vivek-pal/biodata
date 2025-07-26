import React from "react";
import { HashRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

const Routes = () => {
  return (
    <HashRouter>
      <RouterRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/login" element={<Login />} />
      </RouterRoutes>
    </HashRouter>
  );
};

export default Routes;
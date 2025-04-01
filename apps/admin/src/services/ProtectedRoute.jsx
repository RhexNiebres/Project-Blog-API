import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../../shared/services/AuthService";

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

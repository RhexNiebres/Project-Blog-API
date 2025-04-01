import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/AdminDashboard";
import Login from "../../shared/pages/Login";
import Signup from "../../shared/pages/Signup";
import LandingPage from "../../shared/pages/LandingPage";
import ProtectedRoute from "../../shared/services/ProtectedRoute";
import './app.css'; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login role="admin" />} />
        <Route path="/signup" element={<Signup role="admin" />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/AdminDashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

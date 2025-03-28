import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../shared/pages/Login";
import Signup from "../../shared/pages/Signup";
import LandingPage from "../../shared/pages/LandingPage";
import Home from "./pages/Home";
import ProtectedRoute from "../../shared/services/ProtectedRoute"; 
import './index.css';  
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={< LandingPage/>} />
      <Route path="/login" element={<Login role="user" />} />
      <Route path="/signup" element={<Signup role="user" />} />

      <Route element={<ProtectedRoute />}>
      <Route path="/home" element={<Home/>} />
      </Route>
      
    </Routes>
  </BrowserRouter>
);

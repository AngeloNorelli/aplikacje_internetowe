import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import DashboardPage from "./components/dashboard/Dashboard";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "./context/ToastContext";
import { LanguageProvider } from "./context/LanguageContext";
import { FontSizeProvider } from "./context/FontSizeProvicer";

const App: React.FC = () => {
  return (
    <Router>
      <LanguageProvider>
        <FontSizeProvider>
          <ToastProvider>
            <ToastContainer position="bottom-left" newestOnTop={true} />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </ToastProvider>
        </FontSizeProvider>
      </LanguageProvider>
    </Router>
  );
};

export default App;

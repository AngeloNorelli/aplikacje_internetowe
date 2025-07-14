import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import OAutchCallback from "./components/OAuthCallback";
import DashboardPage from "./components/dashboard/Dashboard";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "./context/ToastContext";
import { SettingsProvider } from "./context/SettingsContext";

const App: React.FC = () => {
  return (
    <Router>
      <SettingsProvider>
        <ToastProvider>
          <ToastContainer position="bottom-left" newestOnTop={true} />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/google/callback" element={<OAutchCallback />} />
            <Route path="/auth/github/callback" element={<OAutchCallback />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </ToastProvider>
      </SettingsProvider>
    </Router>
  );
};

export default App;

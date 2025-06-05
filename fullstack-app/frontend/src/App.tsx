import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "./context/ToastContext";

const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <ToastContainer position="bottom-left" newestOnTop={true} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* TODO 
            - Route for dashboard /dashboard 
              for the notes window
          */}
        </Routes>
      </ToastProvider>
    </Router>
  );
};

export default App;

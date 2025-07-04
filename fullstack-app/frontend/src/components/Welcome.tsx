import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "2Note - Welcome";
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-primary">
      <div className="text-center mb-4">
        <div
          className="bg-light d-inline-flex justify-content-center align-items-center"
          style={{ width: "128px", height: "100px" }}
        >
          <span className="fw-bold">LOGO</span>
        </div>
      </div>
      <div className="card p4" style={{ width: "24rem" }}>
        <h1 className="text-center mb-4" style={{ color: "white" }}>
          Welcome to Our App!
        </h1>
        <div className="d-grid gap-3">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
          <button
            className="btn btn-outline-primary btn-lg"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

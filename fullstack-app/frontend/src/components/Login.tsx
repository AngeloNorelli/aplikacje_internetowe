import React, { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useSettings } from "../context/SettingsContext";
import translations from "../assets/translations";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setErrorMessage } = useToast();
  const { setSuccessMessage } = useToast();
  const navigate = useNavigate();
  const { language } = useSettings();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = await login(username, password);
      setSuccessMessage(translations[language].loginSuccess);
      window.dispatchEvent(new Event("localTokenUpdate"));
      navigate("/dashboard", { state: { token } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(translations[language].unknownError);
      }
    }
  };

  useEffect(() => {
    document.title = "2Note - Login";
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
      <div className="card p-4" style={{ width: "24rem" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="username" className="form-label ms-2">
              {translations[language].login}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label ms-2">
              {translations[language].password}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {translations[language].loginButton}
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-muted">
            {translations[language].noAccountQuestion}{" "}
            <Link to="/register" className="text-decoration-none">
              {translations[language].register}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

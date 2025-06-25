import React, { useState } from "react";
import { useToast } from "../context/ToastContext";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { useLanguage } from "../context/LanguageContext";

const translations = {
  en: {
    register: "register",
    email: "email",
    username: "username",
    password: "password",
    repeatPassword: "repeat password",
    registerButton: "Register",
    accountCreated: "Account created successfully! You can now log in.",
    passwordsDoNotMatch: "Passwords do not match!",
    unknownError: "An unknown error occurred.",
    accountAlreadyExistsQuestion: "Already have an account?",
    login: "Login",
  },
  pl: {
    register: "rejestracja",
    email: "email",
    username: "nazwa użytkownika",
    password: "hasło",
    repeatPassword: "powtórz hasło",
    registerButton: "Zarejestruj się",
    accountCreated: "Konto zostało pomyślnie utworzone! Możesz się teraz zalogować.",
    passwordsDoNotMatch: "Hasła nie pasują do siebie!",
    unknownError: "Wystąpił nieznany błąd.",
    accountAlreadyExistsQuestion: "Masz już konto?",
    login: "Zaloguj się",
  },
};

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { setErrorMessage } = useToast();
  const { setSuccessMessage } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setErrorMessage(translations[language].passwordsDoNotMatch);
      return;
    }

    try {
      await register(email, username, password);
      setSuccessMessage(translations[language].accountCreated);
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(translations[language].unknownError);
      }
    }
  };

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
            <label htmlFor="email" className="form-label ms-2">
              {translations[language].email}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="username" className="form-label ms-2">
              {translations[language].username}
            </label>
            <input
              type="username"
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
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label ms-2">
              {translations[language].repeatPassword}
            </label>
            <input
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {translations[language].registerButton}
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-muted">
            {translations[language].accountAlreadyExistsQuestion}{" "}
            <Link to="/login" className="text-decoration-none">
              {translations[language].login}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

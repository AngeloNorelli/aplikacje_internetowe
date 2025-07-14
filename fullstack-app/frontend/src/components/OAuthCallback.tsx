import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useSettings } from "../context/SettingsContext";
import translations from "../assets/translations";

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useSettings();
  const { setErrorMessage, setSuccessMessage } = useToast();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("localTokenUpdate"));
      setSuccessMessage(translations[language].loginSuccess);
      navigate("/dashboard");
    } else {
      setErrorMessage(translations[language].loginError);
      navigate("/login");
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default OAuthCallback;
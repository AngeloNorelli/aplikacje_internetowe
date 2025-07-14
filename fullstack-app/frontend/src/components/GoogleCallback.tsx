import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();
  const { setErrorMessage, setSuccessMessage } = useToast();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;
    
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("Google Callback token:", token);
    if (token) {
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("localTokenUpdate"));
      setSuccessMessage("Logged in successfully with Google!");
      navigate("/dashboard");
    } else {
      setErrorMessage("Failed to log in with Google.");
      navigate("/login");
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default GoogleCallback;
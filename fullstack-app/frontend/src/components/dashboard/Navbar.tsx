import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useSettings } from '../../context/SettingsContext';
import translations from '../../assets/translations';

const Navbar: React.FC = () => {
  const { language } = useSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(false);
  const navigate = useNavigate();

  const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return "Guest";
    try {
      const decoded: any = jwtDecode(token);
      return decoded.username || "Guest";
    } catch {
      return "Guest";
    }
  };

  useEffect(() => {
    setUsername(getUsernameFromToken());

    const onLocalTokenUpdate = () => {
      setUsername(getUsernameFromToken());
    };
    window.addEventListener("localTokenUpdate", onLocalTokenUpdate);

    return () => window.removeEventListener("localTokenUpdate", onLocalTokenUpdate);
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("click", closeMenu);
    window.addEventListener("keydown", closeMenu);
    return () => {
      window.removeEventListener("keydown", closeMenu);
      window.removeEventListener("click", closeMenu);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <button
          type="button"
          style={{
            background: "#fff",
            color: "#222",
            fontWeight: "bold",
            padding: "6px 16px",
            borderRadius: 2,
            fontSize: 20,
            border: "none",
            cursor: "pointer"
          }}
          onClick={() => navigate("/dashboard")}
        >
          LOGO
        </button>
        <div className="d-flex align-items-center">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#fff",
            }}
          />
          <button
            className="btn btn"
            type="button"
            onClick={e => {
              e.stopPropagation();
              setMenuOpen(open => !open);
            }}
            aria-expanded={menuOpen}
          >
            <span 
              className="span"
              style={{ color: "white" }}
            >
              {username}
            </span>
          </button>
          {menuOpen && (
            <div 
              className="dropdown-menu dropdown-menu-end shadow show"
              style={{ 
                  backgroundColor: "var(--light)",
                  position: "absolute",
                  top: "101%",
                  right: 0,
                  minWidth: "130px",
                }}
            >
              <button 
                className='dropdown-item btn'
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                {translations[language].notes}
              </button>
              <button 
                className='dropdown-item btn'
                onClick={() => {
                  navigate("/profile");
                }}
              >
                {translations[language].profile}
              </button>
              <button 
                className='dropdown-item btn'
                onClick={() => {
                  navigate("/settings");
                }}
              >
                {translations[language].settings}
              </button>
              <button 
                className='dropdown-item btn'
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                {translations[language].logout}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

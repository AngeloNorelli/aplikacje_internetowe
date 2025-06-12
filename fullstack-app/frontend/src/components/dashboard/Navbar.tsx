import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  let username = "Username";
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      username = decodedToken.username || "Username";
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  React.useEffect(() => {
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
        <div
          style={{
            background: "#fff",
            color: "#222",
            fontWeight: "bold",
            padding: "6px 16px",
            borderRadius: 2,
            fontSize: 20
          }}
        >
          LOGO
        </div>
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
                  left: "89.7%",
                  minWidth: "130px",
                }}
            >
              <button 
                className='dropdown-item btn'
                onClick={() => {
                  navigate("/profile");
                }}
              >
                user profile
              </button>
              <button 
                className='dropdown-item btn'
                onClick={() => {
                  navigate("/settings");
                }}
              >
                settings
              </button>
              <button 
                className='dropdown-item btn'
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

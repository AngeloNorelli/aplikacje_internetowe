import React from 'react';

const Navbar: React.FC = () => (
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
            marginRight: 8
          }}
        />
        <span style={{ color: "#fff", fontSize: 18 }}>Username</span>
      </div>
    </div>
  </nav>
);

export default Navbar;

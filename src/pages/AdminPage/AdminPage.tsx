// src/pages/AdminPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "./AdminPage.css";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="adminpage-container">
      <button
        className="button-admin-registeruser"
        onClick={() => navigate("/register")}
      >
        <FontAwesomeIcon icon={faUserPlus} className="icon" />
        Register A User
      </button>
      <button className="button-admin-login" onClick={() => navigate("/login")}>
        <FontAwesomeIcon icon={faSignInAlt} className="icon" />
        Login
      </button>
    </div>
  );
};

export default AdminPage;

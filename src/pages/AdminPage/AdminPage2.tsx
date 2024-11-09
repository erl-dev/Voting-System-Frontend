import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPoll, faIdCard } from "@fortawesome/free-solid-svg-icons"; // Changed to suitable icons
import "./AdminPage.css";

const AdminPage2: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");

    // Redirect if not authenticated or role is not correct
    if (!token || roleId !== "1") {
      navigate("/login"); // Redirect to login if no token or not admin
    }
  }, [navigate]);

  return (
    <div className="adminpage-container">
      <button
        className="button-admin-registeruser"
        onClick={() => navigate("/mngelectionhome")}
      >
        <FontAwesomeIcon icon={faPoll} className="icon" />{" "}
        {/* Icon for Manage Elections */}
        Manage Elections
      </button>
      <button
        className="button-admin-login"
        onClick={() => navigate("/candidate")}
      >
        <FontAwesomeIcon icon={faIdCard} className="icon" />{" "}
        {/* Icon for Add Candidates */}
        Manage Candidates
      </button>
    </div>
  );
};

export default AdminPage2;

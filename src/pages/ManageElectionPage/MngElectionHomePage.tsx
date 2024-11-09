import React from "react";
import { useNavigate } from "react-router-dom";

const MngElectionHomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="manage-election-home-container">
      <button
        className="button-admin-registeruser"
        onClick={() => navigate("/register")}
      >
        Find All Elections
      </button>
      <button className="button-admin-login" onClick={() => navigate("/login")}>
        Add Election
      </button>
      <button className="button-admin-login" onClick={() => navigate("/login")}>
        Delete Election
      </button>
    </div>
  );
};

export default MngElectionHomePage;

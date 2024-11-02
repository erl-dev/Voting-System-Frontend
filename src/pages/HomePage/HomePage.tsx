import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield, faUser } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1>WELCOME TO VOTING SYSTEM!</h1>
      <div className="button-container">
        {" "}
        {/* New container for buttons */}
        <button className="button" onClick={() => navigate("/admin")}>
          <FontAwesomeIcon icon={faUserShield} className="icon" />
          Admin
        </button>
        <button className="button" onClick={() => alert("Button 2 clicked!")}>
          <FontAwesomeIcon icon={faUser} className="icon" />
          Voter
        </button>
      </div>
    </div>
  );
};

export default HomePage;

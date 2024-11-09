import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

Modal.setAppElement("#root");

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      Email: email,
      Password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming backend returns a JWT and roleId
        localStorage.setItem("token", data.token); // Store the token
        localStorage.setItem("roleId", data.roleId); // Store the roleId
        if (data.roleId === 1) {
          navigate("/admin2");
        } else {
          setModalMessage(data.message);
        }
      } else {
        setModalMessage(data.message); // Handle error message
      }
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setModalMessage("An error occurred: " + errorMessage);
    } finally {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="loginpage-container">
      <header>Login Form</header>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-box">
          <label>Email</label>
          <input
            className="input-field"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <label>Password</label>
          <input
            className="input-field"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button-login">
          Submit
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Login Response"
        className="modal"
        overlayClassName="ReactModal__Overlay"
      >
        <h2>INFO</h2>
        <p>{modalMessage}</p>
        <button onClick={closeModal}>OK</button>
      </Modal>
    </div>
  );
};

export default LoginPage;

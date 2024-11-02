import React, { useState } from "react";
import Modal from "react-modal";
import "./LoginPage.css";

Modal.setAppElement("#root");

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

      // Ensure response is parsed as JSON
      const data = await response.json();

      // Check if response is OK and handle accordingly
      if (response.ok) {
        setModalMessage(data.message); // Use message from backend
      } else {
        setModalMessage(data.message); // Handle error message
      }
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred."; // Default message

      if (error instanceof Error) {
        errorMessage = error.message; // Get the message if error is an instance of Error
      } else if (typeof error === "string") {
        errorMessage = error; // Handle string errors directly
      }

      setModalMessage("An error occurred: " + errorMessage); // Set modal message for error
    } finally {
      setIsModalOpen(true); // Open the modal regardless of success or error
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="loginpage-container">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">Login</h2>

        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button-login">
          Submit
        </button>
      </form>

      {/* Modal for displaying messages */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Login Response"
        className="modal" // Apply your custom class
        overlayClassName="ReactModal__Overlay" // Custom overlay class
      >
        <h2>INFO</h2> {/* You can add a title for better presentation */}
        <p>{modalMessage}</p>
        <button onClick={closeModal}>OK</button>
      </Modal>
    </div>
  );
};

export default LoginPage;

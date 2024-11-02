// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import Modal from "react-modal"; // Import the modal library
import "./RegisterPage.css";

Modal.setAppElement("#root");

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Select Role");
  const [roleId, setRoleId] = useState(0);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleRoleSelect = (selectedRole: string) => {
    let id = selectedRole === "Admin" ? 1 : 2; // Set ID based on role
    setRole(selectedRole);
    setRoleId(id);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      RoleId: roleId,
    };

    try {
      const response = await fetch("http://localhost:8080/api/user/register", {
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
        setModalMessage(data.message || "Registration successful!"); // Use message from backend
      } else {
        setModalMessage(
          data.message || "Registration failed. Please try again."
        ); // Handle error message
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
    <div className="registerpage-container">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">Register</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          <select
            value={role}
            onChange={(e) => handleRoleSelect(e.target.value)}
          >
            <option disabled>Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Voter">Voter</option>
          </select>
        </div>
        <button type="submit" className="register-button">
          Submit
        </button>
      </form>

      {/* Modal for displaying messages */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Registration Response"
        className="modal" // Apply your custom class
        overlayClassName="ReactModal__Overlay" // Custom overlay class
      >
        <h2>INFO</h2> {/* You can add a title for better presentation */}
        <p>{modalMessage}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default RegisterPage;

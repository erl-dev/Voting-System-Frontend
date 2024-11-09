import RegisterPage from "./pages/RegisterPage/RegisterPage";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminPage2 from "./pages/AdminPage/AdminPage2";
import LoginPage from "./pages/LoginPage/LoginPage";
import MngElectionHomePage from "./pages/ManageElectionPage/MngElectionHomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin2" element={<AdminPage2 />} />
        <Route path="/mngelectionhome" element={<MngElectionHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-header">Registration and Login</h1>
        <div className="app-section">
          <div className="app-card">
            <Register />
          </div>
          <div className="app-card">
            <Login />
          </div>
        </div>

        <h1>User Management</h1>
        <div className="app-section">
          <Link to="/update">
            <button className="app-button">Update User</button>
          </Link>
          <Link to="/delete">
            <button className="app-button">Delete User</button>
          </Link>
        </div>

        <Routes>
          <Route path="/update" element={<UpdateUser />} />
          <Route path="/delete" element={<DeleteUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
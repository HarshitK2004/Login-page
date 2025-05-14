import React, { useState } from "react";

function DeleteUser() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const deleteUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username,
        }),
      });
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("An error occurred while deleting the user.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteUser();
  };

  return (
    <div>
      <h2>Delete User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Delete</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DeleteUser;
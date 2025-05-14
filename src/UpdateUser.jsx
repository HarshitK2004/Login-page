import React, { useState } from "react";

function UpdateUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const updateUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/update", {
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username,
          email,
        }),
      });
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("An error occurred while updating the user.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="New Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateUser;
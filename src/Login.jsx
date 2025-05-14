import React, { useState } from "react";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      setMessage("Username/Email and password cannot be empty!");
      clearMessageAfterDelay();
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ identifier, password }),
      });

      const data = await response.text();
      setMessage(data);
      clearMessageAfterDelay();

      setIdentifier("");
      setPassword("");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      clearMessageAfterDelay();
      console.error("Login error:", error);
    }
  };

  const clearMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
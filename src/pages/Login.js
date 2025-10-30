import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (data.success) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("email", email);
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        setMessage(data.message || "Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Backend not reachable or server error.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      <h2 style={{ color: "#1a237e", marginBottom: "1rem" }}>
        Cloud Security Login
      </h2>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "300px",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "10px", borderRadius: "5px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "10px", borderRadius: "5px" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#1a73e8",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <p style={{ marginTop: "10px", color: "#555" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#1a73e8" }}>
            Register
          </a>
        </p>
        {message && (
          <p style={{ marginTop: "10px", color: "#1a237e" }}>{message}</p>
        )}
      </form>
    </div>
  );
}

export default Login;

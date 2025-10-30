import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        setTimeout(() => {
          navigate("/"); // ✅ Redirect to login page after success
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error connecting to server");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🧾 Register - Cloud Security Portal</h1>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-3 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-center text-gray-600 mt-4">{message}</p>

        <p className="text-center text-blue-600 mt-3">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;

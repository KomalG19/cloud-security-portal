import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">
        ☁️ Cloud Security Dashboard
      </h1>
      <p className="text-gray-600 mb-6">Welcome to your Cloud Security Portal.</p>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Home;

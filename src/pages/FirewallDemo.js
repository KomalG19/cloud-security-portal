import React, { useState } from "react";

const FirewallDemo = () => {
  const [ip, setIp] = useState("");
  const [message, setMessage] = useState("");

  const handleTest = async () => {
    const res = await fetch("http://127.0.0.1:5000/simulate-firewall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="container py-5">
      <h3 className="text-center text-primary mb-3">Firewall Simulation</h3>
      <input
        className="form-control mb-3"
        placeholder="Enter IP address (e.g. 192.168.1.1)"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
      />
      <button className="btn btn-primary w-100" onClick={handleTest}>
        Test Firewall
      </button>
      <p className="mt-3 fw-semibold text-center">{message}</p>
    </div>
  );
};

export default FirewallDemo;

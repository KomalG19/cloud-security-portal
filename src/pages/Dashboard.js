import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Dashboard = () => {
  const [activeDemo, setActiveDemo] = useState(null);
  const [ip, setIp] = useState("");
  const [firewallMessage, setFirewallMessage] = useState("");
  const [text, setText] = useState("");
  const [encrypted, setEncrypted] = useState("");

  const handleFirewallTest = async () => {
    const response = await fetch("http://127.0.0.1:5000/simulate-firewall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip }),
    });
    const data = await response.json();
    setFirewallMessage(data.message);
  };

  const handleEncrypt = () => {
    if (!text) return setEncrypted("Enter some text to encrypt!");
    const encoded = btoa(text);
    setEncrypted(encoded);
  };

  const handleDecrypt = () => {
    if (!encrypted) return setText("Enter text to decrypt!");
    try {
      const decoded = atob(encrypted);
      setText(decoded);
    } catch (e) {
      setText("Invalid encrypted text!");
    }
  };

  const demos = [
    {
      title: "Firewall Simulation",
      description: "Simulate network packet filtering to prevent unauthorized access.",
      icon: "fa-shield-alt",
      modal: "firewall",
    },
    {
      title: "Encryption Demo",
      description: "Encrypt and decrypt messages using AES (simulated).",
      icon: "fa-lock",
      modal: "encryption",
    },
    {
      title: "Access Control",
      description: "Manage user permissions for secure data access.",
      icon: "fa-user-shield",
      modal: "access",
    },
    {
      title: "Intrusion Detection",
      description: "Monitor suspicious network activity (mock demo).",
      icon: "fa-network-wired",
      modal: "intrusion",
    },
    {
      title: "Data Backup",
      description: "Simulate secure cloud data backup and restore.",
      icon: "fa-database",
      modal: "backup",
    },
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* ✅ Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            ☁️ Cloud Security Portal
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-white" href="/dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/login">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ Dashboard Cards */}
      <div className="container py-5">
        <h2 className="mb-4 fw-bold text-center text-primary">
          🔒 Cloud Security Demonstrations
        </h2>

        <div className="row">
          {demos.map((demo, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <i className={`fas ${demo.icon} fa-3x text-primary mb-3`}></i>
                  <h5 className="card-title fw-bold">{demo.title}</h5>
                  <p className="card-text text-muted">{demo.description}</p>
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => setActiveDemo(demo.modal)}
                  >
                    Run Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Firewall Demo Modal */}
      {activeDemo === "firewall" && (
        <div className="modal show d-block" tabIndex="-1" onClick={() => setActiveDemo(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Firewall Simulation</h5>
                <button className="btn-close" onClick={() => setActiveDemo(null)}></button>
              </div>
              <div className="modal-body">
                <p>Enter an IP address to test access control:</p>
                <input
                  className="form-control mb-3"
                  placeholder="e.g., 192.168.1.1"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                />
                <button onClick={handleFirewallTest} className="btn btn-primary w-100">
                  Test Firewall
                </button>
                <p className="mt-3 fw-semibold text-center">{firewallMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Encryption Demo Modal */}
      {activeDemo === "encryption" && (
        <div className="modal show d-block" tabIndex="-1" onClick={() => setActiveDemo(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Encryption Demo</h5>
                <button className="btn-close" onClick={() => setActiveDemo(null)}></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control mb-3"
                  placeholder="Enter text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="d-flex gap-2">
                  <button className="btn btn-success w-50" onClick={handleEncrypt}>
                    Encrypt
                  </button>
                  <button className="btn btn-secondary w-50" onClick={handleDecrypt}>
                    Decrypt
                  </button>
                </div>
                <p className="mt-3 text-muted small">Encrypted Output:</p>
                <div className="p-2 border rounded bg-light text-break">{encrypted}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

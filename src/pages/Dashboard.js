import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Dashboard = () => {
  const [activeDemo, setActiveDemo] = useState(null);
  const [ip, setIp] = useState("");
  const [firewallMessage, setFirewallMessage] = useState("");
  const [text, setText] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [userRole, setUserRole] = useState("Guest");
  const [intrusionDetected, setIntrusionDetected] = useState(false);
  const [backupStatus, setBackupStatus] = useState("");

  // ✅ Firewall Simulation
  const handleFirewallTest = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/simulate-firewall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip }),
      });
      const data = await response.json();
      setFirewallMessage(data.message);
    } catch {
      setFirewallMessage("⚠️ Unable to connect to the backend server.");
    }
  };

  // ✅ Encryption / Decryption
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
    } catch {
      setText("Invalid encrypted text!");
    }
  };

  // ✅ Access Control
  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  // ✅ Intrusion Detection
  const handleIntrusionCheck = () => {
    const suspicious = Math.random() > 0.6;
    setIntrusionDetected(suspicious);
  };

  // ✅ Backup Simulation
  const handleBackup = () => {
    setBackupStatus("⏳ Backing up data to secure cloud...");
    setTimeout(() => {
      setBackupStatus("✅ Backup completed successfully!");
    }, 2000);
  };

  // Demo Cards
  const demos = [
    {
      title: "Firewall Simulation",
      description: "Simulate packet filtering to prevent unauthorized access.",
      icon: "fa-shield-alt",
      modal: "firewall",
    },
    {
      title: "Encryption Demo",
      description: "Encrypt and decrypt text using simulated AES algorithm.",
      icon: "fa-lock",
      modal: "encryption",
    },
    {
      title: "Access Control",
      description: "Assign user roles to control data access securely.",
      icon: "fa-user-shield",
      modal: "access",
    },
    {
      title: "Intrusion Detection",
      description: "Monitor for suspicious activity in real-time.",
      icon: "fa-network-wired",
      modal: "intrusion",
    },
    {
      title: "Data Backup",
      description: "Simulate secure backup and restore operations.",
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
              <div className="card shadow-sm h-100 border-0">
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

      {/* ✅ FIREWALL MODAL */}
      {activeDemo === "firewall" && (
        <Modal title="Firewall Simulation" onClose={() => setActiveDemo(null)}>
          <p>Enter an IP address to test:</p>
          <input
            className="form-control mb-3"
            placeholder="e.g., 192.168.1.1"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
          <button onClick={handleFirewallTest} className="btn btn-primary w-100">
            Test Firewall
          </button>
          <p className="mt-3 text-center fw-semibold">{firewallMessage}</p>
        </Modal>
      )}

      {/* ✅ ENCRYPTION MODAL */}
      {activeDemo === "encryption" && (
        <Modal title="Encryption Demo" onClose={() => setActiveDemo(null)}>
          <textarea
            className="form-control mb-3"
            placeholder="Enter text to encrypt or decrypt..."
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
        </Modal>
      )}

      {/* ✅ ACCESS CONTROL MODAL */}
      {activeDemo === "access" && (
        <Modal title="Access Control Demo" onClose={() => setActiveDemo(null)}>
          <p>Select a user role to test data access permissions:</p>
          <select
            className="form-select mb-3"
            value={userRole}
            onChange={handleRoleChange}
          >
            <option>Guest</option>
            <option>User</option>
            <option>Admin</option>
          </select>
          <div className="alert alert-info">
            Current role: <b>{userRole}</b>
          </div>
          <p>
            {userRole === "Admin"
              ? "✅ Access granted to all secure data and configurations."
              : userRole === "User"
              ? "⚙️ Limited access to assigned cloud resources."
              : "🚫 Access restricted. Please log in with higher privileges."}
          </p>
        </Modal>
      )}

      {/* ✅ INTRUSION DETECTION MODAL */}
      {activeDemo === "intrusion" && (
        <Modal title="Intrusion Detection Demo" onClose={() => setActiveDemo(null)}>
          <p>Click below to simulate a security scan:</p>
          <button className="btn btn-primary w-100" onClick={handleIntrusionCheck}>
            Run Detection
          </button>
          <div className="mt-3 text-center">
            {intrusionDetected ? (
              <div className="alert alert-danger">🚨 Intrusion detected!</div>
            ) : (
              <div className="alert alert-success">✅ No intrusions found.</div>
            )}
          </div>
        </Modal>
      )}

      {/* ✅ DATA BACKUP MODAL */}
      {activeDemo === "backup" && (
        <Modal title="Data Backup Simulation" onClose={() => setActiveDemo(null)}>
          <p>Simulate secure data backup and restore:</p>
          <button className="btn btn-primary w-100" onClick={handleBackup}>
            Start Backup
          </button>
          <p className="mt-3 text-center fw-semibold">{backupStatus}</p>
        </Modal>
      )}
    </div>
  );
};

// ✅ Reusable Modal Component
const Modal = ({ title, children, onClose }) => (
  <div className="modal show d-block" tabIndex="-1" onClick={onClose}>
    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content">
        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title">{title}</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </div>
);

export default Dashboard;

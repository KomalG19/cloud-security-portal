import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EncryptionDemo from "./pages/EncryptionDemo";
import FirewallDemo from "./pages/FirewallDemo";
import AccessControlDemo from "./pages/AccessControlDemo";
import IntrusionDetectionDemo from "./pages/IntrusionDetectionDemo";
import FileSecurityDemo from "./pages/FileSecurityDemo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Demo Pages */}
        <Route path="/encryption-demo" element={<EncryptionDemo />} />
        <Route path="/firewall-demo" element={<FirewallDemo />} />
        <Route path="/access-control" element={<AccessControlDemo />} />
        <Route path="/intrusion-detection" element={<IntrusionDetectionDemo />} />
        <Route path="/file-security" element={<FileSecurityDemo />} />
      </Routes>
    </Router>
  );
}

export default App;

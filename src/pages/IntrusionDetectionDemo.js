import React from "react";
import { Alert } from "react-bootstrap";

const IntrusionDetectionDemo = () => (
  <div className="container py-5">
    <h4 className="text-center text-danger mb-4">Intrusion Detection Demo</h4>
    <Alert variant="warning" className="text-center">
      🔍 Monitoring network traffic for suspicious activity...
    </Alert>
    <p className="text-muted text-center">
      If suspicious activity is detected, alerts will appear here (simulated).
    </p>
  </div>
);

export default IntrusionDetectionDemo;

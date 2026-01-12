import React from "react";
import { Card } from "react-bootstrap";

const FileSecurityDemo = () => (
  <div className="container py-5">
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Data Backup & Recovery</Card.Title>
        <Card.Text>
          Simulate secure cloud data backup and restoration.
          <br />
          Data integrity is ensured using checksum validation.
        </Card.Text>
        <button className="btn btn-success w-100">Backup Now</button>
      </Card.Body>
    </Card>
  </div>
);

export default FileSecurityDemo;

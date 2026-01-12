import React from "react";
import { Card, Button } from "react-bootstrap";

const AccessControlDemo = () => (
  <div className="container py-5">
    <Card className="shadow">
      <Card.Body>
        <Card.Title>Access Control Demo</Card.Title>
        <Card.Text>
          This demo shows how user permissions can be managed for secure data
          access. You can define roles such as Admin, User, and Guest.
        </Card.Text>
        <Button variant="primary">Simulate Access Control</Button>
      </Card.Body>
    </Card>
  </div>
);

export default AccessControlDemo;

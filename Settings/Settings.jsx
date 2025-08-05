import React from "react";
import Header from "../components/Layouts/Header";
import { Card, Form, Button } from "react-bootstrap";

const Settings = () => (
  <div>
    <Header title="Settings" />
    <Card className="p-4 shadow-sm mb-3 mx-auto" style={{ maxWidth: 500, background: "#e8f0fe" }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" value="Ajinkya Patil" readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value="ajinkya.patil@email.com" readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Change Password</Form.Label>
          <Form.Control type="password" placeholder="********" />
        </Form.Group>
        <Button variant="primary">Update</Button>
      </Form>
    </Card>
  </div>
);
export default Settings;

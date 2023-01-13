import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const footer = () => {
  return (
    <footer className="foot">
      <Container>
        <Row>
          <Col className="text-center ">Footer</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default footer;

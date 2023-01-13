import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "./Setting.css";


// import  withRouter  from "react-router";


const Setting = () => {
  return (
        
    <div>

      <Container >
        <Row>
          <Col xs={2} className="side">
            <Sidebar xs={2}  />
          </Col>
          <Col xs={10} className="page-content-wrapper">
          
          </Col>
        </Row>
      </Container>
    </div>
        
  );
};

export default Setting;

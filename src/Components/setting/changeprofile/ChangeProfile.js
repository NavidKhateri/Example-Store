import React, { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../Sidebar";
import "../Setting.css";
import axios from "axios";
import Rotate from 'react-reveal/Rotate';

const ChangeProfile = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "first") {
        setFirst(value);
    }
    if (id === "last") {
        setLast(value);
    }
    if (id === "gender") {
        setGender(value);
    }
    if (id === "age") {
        setAge(value);
    }
    if (id === "city") {
        setCity(value);
    }
  };

  const senddata = async () => {
    try {
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-profile",
        {
          firstname: first,
          lastname: last,
          gender: gender,
          age: age,
          city: city
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      alert(data.message)
      
    } catch (error) {
      alert(error.response.data.message)
      
     
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col xs={2} className="side">
            <Sidebar />
          </Col>
          <Col xs={10} className="page-content-wrapper">
          <Rotate bottom left cascade>
            <form className="mb-0">
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="first"
                      className="form-control input-custom"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label className="form-label">FirstName</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="last"
                      className="form-control input-custom"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label className="form-label">LastName</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="gender"
                      className="form-control input-custom"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label className="form-label">Gender</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="number"
                      id="age"
                      className="form-control input-custom"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label className="form-label">Age</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="city"
                      className="form-control input-custom"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label className="form-label">City</label>
                  </div>
                </div>
              </div>
              <div className="float-end ">
                <button
                  className="btn btn-primary btn-rounded"
                  style={{ backgroundColor: "#0062CC " }}
                  onClick={(e) => {
                    e.preventDefault();
                    senddata()
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
            </Rotate>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChangeProfile;

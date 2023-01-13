import React, { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../Sidebar";
import "../Setting.css";
import axios from "axios";
import Rotate from 'react-reveal/Rotate';

const ChangePassword = () => {
  const [old, setOld] = useState("");
  const [neww, setNeww] = useState("");

  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "old") {
      setOld(value);
    }
    if (id === "new") {
      setNeww(value);
    }
  };

  const senddata = async () => {
    try {
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-password",
        {
          old_password: old,
          new_password: neww,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      alert(data.message);
    } catch (error) {
      alert(error.response.data.message);
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
                      id="old"
                      className="form-control input-custom"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label className="form-label">Old Password</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="new"
                      className="form-control input-custom"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label className="form-label">New Password</label>
                  </div>
                </div>
              </div>
              <div className="float-end ">
                <button
                  className="btn btn-primary btn-rounded"
                  style={{ backgroundColor: "#0062CC " }}
                  onClick={(e) => {
                    e.preventDefault();
                    senddata();
                  }}
                >
                  Change
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

export default ChangePassword;

import React, { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../Sidebar";
import "../Setting.css";
import axios from "axios";
import Rotate from 'react-reveal/Rotate';

const UploadPhoto = () => {
    const [pic, setPic] = useState(null);
    
   
  
 
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setPic(e.target.files[0])
  };

  const senddata = async () => {
    let formData = new FormData(); 
    formData.append('profile-image' , pic)
    console.log(formData);
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/profile-image",
        formData,
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

            <form className="mb-0" onSubmit={(e)=> e.preventDefault()}>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="file"
                      className="form-control input-custom"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label className="form-label">Image</label>
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
                  uploadImage
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

export default UploadPhoto;

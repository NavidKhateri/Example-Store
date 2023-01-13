import React, { useState } from "react";
import "./Address.css";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import Zoom from 'react-reveal/Zoom';
const Address = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "address") {
      setAddress(value);
    }
    if (id === "city") {
      setCity(value);
    }
    if (id === "postalCode") {
      setPostalCode(value);
    }
    if (id === "phone") {
      setPhone(value);
    }
  };

  const sendetel = () => {
    localStorage.setItem(
      "address",
      JSON.stringify({
        address: address,
        city: city,
        postalCode: postalCode,
        phone: phone,
      })
    );
    navigate("/checkout");
  };

  return (
    <Zoom bottom>
    <div className="row mt-3 mx-3" style={{ marginTop: "25px" }}>
      <div className="col-md-3">
        <div
          style={{ marginTop: "50px", marginLeft: "10px" }}
          className="text-center"
        >
          <i
            id="animationDemo"
            data-mdb-animation="slide-right"
            data-mdb-toggle="animation"
            data-mdb-animation-reset="true"
            data-mdb-animation-start="onScroll"
            data-mdb-animation-on-scroll="repeat"
            className="fas fa-3x fa-shipping-fast text-white"
          ></i>
          <h3 className="mt-3 text-white">Welcome</h3>
          <p className="white-text">
            You are 30 seconds away from compleating your order!
          </p>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-white btn-rounded back-button"
            style={{
              backgroundColor: "black",
              fontWeight: "700",
              color: "rgb(180, 178, 178)",
              marginTop: "50px",
            }}
            onClick={() => navigate("/cart")}
          >
            Go back
          </button>
        </div>
      </div>
      <div className="col-md-9 justify-content-center">
        <div className="card card-custom pb-4">
          <div className="card-body mt-0 mx-5">
            <div className="text-center mb-3 pb-2 mt-3">
              <h4 style={{ color: "#495057 " }}>Delivery Details</h4>
            </div>

            <form className="mb-0">
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="city"
                      onChange={(e) => handleInputChange(e)}
                      className="form-control input-custom"
                    />
                    <label className="form-label">City</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="postalCode"
                      className="form-control input-custom"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label className="form-label">Postal Code</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="address"
                      className="form-control input-custom"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label className="form-label">Address</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="number"
                      id="phone"
                      className="form-control input-custom"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label className="form-label">Phone</label>
                  </div>
                </div>
              </div>

              <div className="float-end ">
                
                <p
                  style={{
                    color: "red",
                  }}
                >
                  Please checkout
                </p>

                <button
                  className="btn btn-primary btn-rounded"
                  style={{ backgroundColor: "#0062CC " }}
                  onClick={(e) => {
                    e.preventDefault();
                    return sendetel();
                  }}
                >
                  CHECK
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </Zoom>
  );
};

export default React.memo(Address);

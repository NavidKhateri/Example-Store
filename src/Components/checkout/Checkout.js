import React, { useState } from "react";
import { Row, Col, ListGroup, Image, Button, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Roll from 'react-reveal/Roll';

// import { cartReducer } from './../../redux/cartReducer';
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deletall } from "./../../redux/action";
import "./Chekout.css";
const Checkout = () => {
  const [send, setSend] = useState(false);
  const [message, setmessage] = useState(false);
  const [show, setShow] = useState(false);
  const distpatch = useDispatch();

  const handleClose = () => setShow(false);

  let mahsolat = localStorage.getItem("cartItems");

  const vaz = mahsolat ? mahsolat : false;
  // const ala = vaz.message === "logged in" ? vaz : false;
  let copyofmahsolat = JSON.parse(mahsolat);
  const jadid = vaz
    ? copyofmahsolat.map((item) => {
        return {
          product: item.product,
          qty: item.qqt,
        };
      })
    : "";
  const tokenmy = localStorage.getItem("token");

  const totalPriceNew = localStorage.getItem("totalPrice");
  const addr = JSON.parse(localStorage.getItem("address"));
  // console.log(addr);

  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const sendetel = async () => {
    try {
      await axios.post(
        "http://kzico.runflare.run/order/submit",
        {
          orderItems: jadid,
          shippingAddress: addr,
          paymentMethod: "ship",
          shippingPrice: "5",
          totalPrice: totalPriceNew,
        },
        {
          headers: {
            authorization: `Bearer ${tokenmy}`,
          },
        }
      );
      setSend(true);
      setmessage(true);
      setShow(true);
      distpatch(deletall());
    } catch (error) {
      setmessage(false);
      setShow(true);
      console.log(error);
    }
  };

  const totalprice = localStorage.getItem("totalPrice");
  return (
    <Roll bottom>
    <div>
      <Row className="cartbadane">
        <Col md={10}>
          <h2>CheckOut</h2>
          {vaz && cartItems.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <ListGroup variant="flush">
              {vaz &&
                cartItems.map((item) => {
                  return (
                    <ListGroup.Item
                      id="cartitems"
                      key={item.product}
                      style={{
                        width: "100%",
                        height: "100px",
                        marginBottom: "10px",
                        borderRadius: "20px",
                      }}
                    >
                      <Row  style={{
                        displaye: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                      }}>
                        <Col
                          md={2}
                          style={{
                            width: "100px",
                            height: "80px",
                            overflow: "auto",
                          }}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            style={{ width: "100%", height: "80px" }}
                          />
                        </Col>
                        <Col md={6}>{item.name}</Col>
                        <Col md={2}>{item.price} $</Col>
                        <Col md={1}>
                          <Badge type="button" variant="primary">
                            <i className="fa "> {item.qqt}</i>{" "}
                          </Badge>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
            </ListGroup>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <ListGroup variant="dark flush">
              <ListGroup.Item variant="dark" className="priceman">
                Total Price :{" "}
                <span style={{ color: "blue" }}>{totalprice}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <div className="row mt-3 mx-3" style={{ marginTop: "25px" }}>
        <div
          className="col-md-9 justify-content-center"
          style={{ marginTop: "25px", marginBottom: "50px", marginLeft: "15%" }}
        >
          <div className="card card-custom pb-4">
            <div className="card-body mt-0 mx-5">
              <div className="text-center mb-3 pb-2 mt-3">
                <h4 style={{ color: "#495057 " }}>Delivery Details</h4>
              </div>

              <form className="mb-0">
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label">City</label>
                      <p>{addr.city}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label">Postal Code</label>
                      <p>{addr.postalCode}</p>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label">Address</label>
                      <p>{addr.address}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label">Phone</label>
                      <p>{addr.phone}</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Row style={{ marginTop: "50px" }}>
        <Col md={1}>
          <Button
            onClick={() => navigate("/cart")}
            style={{ width: "100px", height: "40px", marginTop: "50px" }}
          >
            Edit
          </Button>
        </Col>
        <Col md={10}> </Col>
        <Col md={1}>
          <Button
            style={{ width: "100px", height: "40px", marginTop: "50px" }}
            onClick={(e) => {
              e.preventDefault();
              return sendetel();
            }}
            disabled={send}
          >
            Submit
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: message ? "green" : "red" }}>
          {" "}
          {message ? "Succsess" : "Erorr"}{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </Roll>
  );
};

export default React.memo(Checkout);

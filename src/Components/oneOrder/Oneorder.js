import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Fade from 'react-reveal/Fade';
import { ListGroup, Row, Col, Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import './Oneorder.css'
const Oneorder = () => {
  const [details, setDetails] = useState(false);

  const { id } = useParams();
  const token = localStorage.getItem("token");
  console.log(details);

  useEffect(() => {
    const fun = async () => {
      try {
        const { data } = await axios(`http://kzico.runflare.run/order/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, [id, token]);

  return (
    <Fade top big cascade>
    <div>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>
            Count Items Order : {details ? details.orderItems.length : "0"}
          </Card.Title>
          <Card.Text>
            <span style={{ color: "blue" }}> Address :</span>
            {details ? details.shippingAddress.address : "empty"}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <div>
              <span style={{ color: "blue" }}> PostalCode : </span>
              {details ? details.shippingAddress.postalCode : "empty"}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <span style={{ color: "blue" }}> Phone : </span>
              {details ? details.shippingAddress.phone : "empty"}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <span style={{ color: "blue" }}> City : </span>
              {details ? details.shippingAddress.city : "empty"}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <span style={{ color: "blue" }}> Total Price : </span>
              {details ? details.totalPrice : "empty"} $
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <ListGroup variant="flush">
        {details &&
          details.orderItems.map((item) => {
            return (
              <ListGroup.Item
                key={item._id}
                id="cartitems"
                style={{
                  width: "100%",
                  height: "100px",
                  marginBottom: "10px",
                  borderRadius: "20px",
                  marginTop: "20px",
                }}
              >
                <Row
                  style={{
                    displaye: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Col
                    md={2}
                    style={{
                      width: "100px",
                      height: "80px",
                      overflow: "auto",
                    }}
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fluid
                      rounded
                      style={{ width: "100%", height: "70px" }}
                    />
                  </Col>
                  <Col md={5}>{item.product.name}</Col>
                  <Col md={2}>{item.product.price} $</Col>

                  <Col md={1}>
                    <Button type="button" variant="primary">
                      <i className="fa "> {item.qty} </i>{" "}
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </div>
    </Fade>
  );
};

export default React.memo(Oneorder);

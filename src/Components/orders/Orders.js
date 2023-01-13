import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, ListGroup, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Roll from 'react-reveal/Roll';

const Orders = () => {
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState([]);
  console.log(order);
  useEffect(() => {
    const fun = async () => {
      try {
        const { data } = await axios("http://kzico.runflare.run/order/", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setOrder(data);
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, [token]);

  return (
    <Roll bottom>
    <div>
      <Row className="cartbadane">
        <Col md={10}>
          <h2>Orders History :</h2>
          {order.length === 0 ? (
            <p>Order is empty </p>
          ) : (
            <ListGroup variant="flush">
              {order &&
                order.map((item) => {
                  return (
                    <ListGroup.Item
                    
                    key={item._id}

                      style={{
                        width: "100%",
                        height: "100px",
                        marginBottom: "10px",
                        borderRadius: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <LinkContainer
                        to={`/orders/${item._id}`}
                        style={{
                          displaye: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center",
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
                            md={1}
                            style={{
                              width: "100px",
                              height: "80px",
                              overflow: "auto",
                            }}
                            variant="secondary"
                          >
                            <Badge bg="black" style={{ marginTop: "40%" }}>
                              ITEMS: {item.orderItems.length}{" "}
                            </Badge>
                          </Col>
                          <Col md={5}>
                            Send to: {item.shippingAddress.address}
                          </Col>

                          <Col md={2}>
                            <Button type="button" variant="primary">
                              <i className="fa ">
                                Total Price: {item.totalPrice.toFixed(2)}
                              </i>{" "}
                            </Button>
                          </Col>
                        </Row>
                      </LinkContainer>
                    </ListGroup.Item>
                  );
                })}
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
    </Roll>
  );
};

export default React.memo(Orders);

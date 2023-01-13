import React, { useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import { useParams, useNavigate } from "react-router-dom";
import {
  addToCart,
  removeItem,
  plusProduct,
  minProduct,
} from "../../redux/action";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const vazel = cartItems.length > 0 ? true : false;
  const mess = vazel ? "continue" : "Please Push Cart";
  const totalprice = cartItems.reduce(
    (jam, item) => jam + item.price * item.qqt,
    0
  );
  localStorage.setItem("totalPrice", totalprice);
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id));
    }
  }, [dispatch, id]);

  const removeProduct = (id) => {
    dispatch(removeItem(id));
  };

  const plusmyProduct = (item) => {
    dispatch(plusProduct(item));
  };
  const minmyProduct = (item) => {
    dispatch(minProduct(item));
  };

  return (
          <Fade left>
    <div>
      <Row className="cartbadane">
        <Col md={10}>
          <h2>Cart Shopping</h2>
          {cartItems.length === 0 ? (
              <p>Cart is empty</p>
            
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => {
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
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                          style={{ width: "100%", height: "80px" }}
                        />
                      </Col>
                      <Col md={4}>{item.name}</Col>
                      <Col md={1}>{item.price} $</Col>
                      <Col md={1}>
                        <Button
                          type="button"
                          variant="dark"
                          onClick={() => removeProduct(item.product)}
                        >
                          <i className="fa fa-trash"></i>{" "}
                        </Button>
                      </Col>
                      <Col md={1}>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => minmyProduct(item)}
                        >
                          <i className="fa fa-minus"></i>{" "}
                        </Button>
                      </Col>
                      <Col md={1}>
                        <Badge type="button" variant="info">
                          <i className="fa "> {item.qqt}</i>{" "}
                        </Badge>
                      </Col>
                      <Col md={1}>
                        <Button
                          type="button"
                          variant="success"
                          onClick={() => plusmyProduct(item)}
                        >
                          <i className="fa fa-plus"></i>{" "}
                        </Button>
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
                <span style={{ color: "blue" }}>
                  {cartItems.reduce(
                    (jam, item) => jam + item.price * item.qqt,
                    0
                  ).toFixed(3)}
                </span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Button
        style={{ color: vazel ? "black" : "rgb(160,20 , 10)" }}
        className="btt"
        onClick={() =>
          cartItems.length > 0
            ? navigate("/address")
            : alert("please Push Cart")
        }
      >
        <b>{mess}</b>
      </Button>
    </div>
    </Fade>
  );
};

export default React.memo(Cart);
// onClick={()=> oneproduct.countInStock > 0 ?   addProtuct : alert("You can't buy this item")}

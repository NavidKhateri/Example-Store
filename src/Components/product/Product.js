import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Spinner } from "react-bootstrap";
import { addToCart } from "../../redux/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Product.css";

const Product = () => {
  const [vaziyat, setVaziyat] = useState({ loading: false, error: "" });
  const [oneproduct, setOneproduct] = useState({});
  
  const lol = oneproduct.countInStock === 0 ? true : false
  const { id } = useParams();
  const dispatch = useDispatch();

  const addgo = ()=> {
    dispatch(addToCart(id) )
    alert("You Added this item")
  }
  useEffect(() => {
    const fun = async () => {
      try {
        setVaziyat({ loading: true, error: "" });

        const { data } = await axios(`http://kzico.runflare.run/product/${id}`);
        setVaziyat({ loading: false, error: "" });
        setOneproduct(data);
      } catch (error) {
        setVaziyat({ loading: false, error: error.message });
      }
    };
    fun();
  }, [id]);

  let navigate = useNavigate();
  const addProtuct = () => {
    navigate(`/cart/${id}`);
  };

  return (
    <div>
      {vaziyat.loading ? (
        <Spinner animation="grow" variant="info" style={{ margin: "0 auto" }} />
      ) : vaziyat.error ? (
        <h1>{vaziyat.error}</h1>
      ) : (
        <div>
          <Link
            to="/"
            className="btn btn-light my-4"
            style={{ backgroundColor: "black", color: "white" }}
          >
            {" "}
            Back To Home
          </Link>

          <Row>
            <Col md={4}>
              <Image
                src={oneproduct.image}
                fluid
                style={{
                  width: "250px",
                  height: "350px",
                  borderRadius: "50px",
                }}
              />
            </Col>
            <Col md={5}>
              <ListGroup variant="flush">
                <ListGroup.Item variant="secondary">
                  <span className="name"> {oneproduct.name} </span>{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <span className="spanlist">Color: </span> {oneproduct.color}{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <span className="spanlist">category: </span>{" "}
                  {oneproduct.category}{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <span className="spanlist">Price: </span> {oneproduct.price}${" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <span className="spanlist">Rating: </span> {oneproduct.rating}{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <span className="spanlist">Brand: </span> {oneproduct.brand}{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <span className="spanlist">CountInStock: </span>{" "}
                  {oneproduct.countInStock}{" "}
                </ListGroup.Item>
              </ListGroup>
              <br />
              <Button onClick={addgo} disabled={lol}>
                Add To Card
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="success" onClick={ addProtuct } disabled={lol} >
                {" "}
                Add/Go To Cart
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default React.memo(Product);

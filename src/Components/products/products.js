import React from "react";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./products.css";

const Products = ({ item }) => {
  return (
    <div key={item._id} className='col-7 mx-auto'>
      <Col sm={12}>
        <Card
          style={{ width: "18.5rem", height: "450px" ,display: 'flex',
          justifyContent:'center',
          alignItems:'center',}}
          className="mt-5 ml-5 cardemon"
          variant="info"
        >
          <LinkContainer
            to={`/product/${item._id}`}
            className="a"
            style={{
              display: 'flex',
              justifyContent:'center',
              alignItems:'center',
              width: "60%",
              height: "230px",
              backgroundColor: "rgb(49, 49, 49)",
              cursor:"pointer"
            }}
          >
            <Card.Img variant="top" src={item.image} alt="Not Availble Image"  />
          </LinkContainer>
          <Card.Body className="cardemonn">
            <LinkContainer to={`/product/${item._id}`} className="a">
              <Card.Title className="title"> {item.name} </Card.Title>
            </LinkContainer>
            <Card.Text
              className="countInStock"
              style={{
                color: item.countInStock < 1 ? "red" : "rgb(7, 90, 245)",
              }}
            >
              <span className="parag">
                {item.countInStock < 1 ? "Not" : `${item.countInStock}`}{" "}
                <span className="Available">Available</span>{" "}
              </span>
            </Card.Text>
            <div className="price">
              <h4>
                <span className="spanrate">Rate: </span>{" "}
                <span className="spanrateadad"> {item.rating} </span>
              </h4>
              <h4>
                {" "}
                <span className="spanrate">Price: </span><span className="teadad"> {item.price} $</span>{" "}
              </h4>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default React.memo(Products);

import React, { useEffect } from "react";
import { Spinner, Row, Col, Container } from "react-bootstrap";
import Products from "./../products/products";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./../../redux/action";
import "./Home.css";
import Fade from 'react-reveal/Fade';


const Home = () => {
  const { data, loading, error } = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Spinner animation="grow" variant="info" style={{ margin: "0 auto" }} />
      ) : error ? (
        <h1 style={{color:'white'}} >{error}</h1>
      ) : (
        
        <Container>
          <Fade left>
          <Row sm={12} className="justify-content-center">
            <Col className="head">
              
              <h1> Products List </h1>
            </Col>
          </Row>
          <Row sm={12} md={2} lg={3} xl={3} xxl={4} className='justify-content-center mx-4' >
            {data.reverse().slice(0,11).map((item) => (
              <Products item={item} key={item._id} />
              )
              )}
          </Row>
              </Fade>
        </Container>
      )}
    </>
  );
};

export default React.memo(Home);

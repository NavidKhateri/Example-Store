import React from "react";
import { Container, Navbar, NavDropdown, Nav, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getprofile } from "./../../redux/action";
import "./Header.css";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.profile);
  const vaz = data ? data : false;
  const ala = vaz.message === "logged in" ? vaz : false;

  return (
    <React.Fragment>
      <header>
        <Navbar collapseOnSelect expand="lg" variant="dark"  className="navasl">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Navid Market</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fa fa-shopping-cart fa-lg">
                      <Badge style={{ fontSize: "10px" }}>
                        {props.meghdarsabad}
                      </Badge>{" "}
                    </i>
                  </Nav.Link>
                </LinkContainer>

                {ala ? (
                  <NavDropdown
                    title={ala ? data.user.email : ""}
                    id="collasible-nav-dropdown"
                    className="oooo"
                  >
                    <div className="ll">
                      <LinkContainer to={"./profile"} id="dodo">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={"/orders"} id="dodo">
                        <NavDropdown.Item>Order</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={"/setting/changepassword"}>
                        <NavDropdown.Item id="dodo">Setting</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        id="didi"
                        onClick={() => {
                          localStorage.removeItem("token");
                          dispatch(getprofile());
                          navigate("/");
                        }}
                      >
                        Log-out
                      </NavDropdown.Item>
                    </div>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fa fa-user"> login</i>
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </React.Fragment>
  );
};

export default React.memo(Header);

import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <Nav
        className=" sidebar"

        // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky">Setting</div>
          <Nav.Item  className='nn'>
        <LinkContainer  to="/setting/changepassword">
            <Nav.Link >ChangePassword</Nav.Link>
        </LinkContainer>
          </Nav.Item>
        <Nav.Item className='nn'>
          <LinkContainer to="/setting/changeprofile">
          <Nav.Link >ChangeProfile</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item className='nn'>
          <LinkContainer to="/setting/upleadphoto">
          <Nav.Link >UploadPhoto</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;

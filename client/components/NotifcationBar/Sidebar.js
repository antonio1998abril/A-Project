import { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Image,
  NavDropdown,
  Button,
  Card,
 Toast 
} from "react-bootstrap";
import { AuthContext } from "../../context";

function Sidebar() {
  const state = useContext(AuthContext);
  const [enableSideBar, setEnableSideBar] = state.User.enableSideBar;

  const showNotifications = () => {
    if (enableSideBar) setEnableSideBar(false);
    if (!enableSideBar) setEnableSideBar(true);
  };

  const data = [
    {
      _id: "1a",
      title: "New Notification",
      content: "content to end",
    },
    {
      _id: "2b",
      title: "New Notification 2",
      content: "content to end 2",
    },
  ];

  return (
    <nav className={enableSideBar ? "sidebar displayBar" : "sidebar"}>
      <div className="nav__container">
        <br /> <br />
        <br />
        <Button className="btn-danger" onClick={showNotifications}>
          Close SideBar
        </Button>
        <br /> <br />
        <Toast>
          <Toast.Header>
           
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        <br />
        <Toast>
          <Toast.Header>
       
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        <br />
        <Toast>
          <Toast.Header>
      
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      </div>
    </nav>
  );
}

export default Sidebar;

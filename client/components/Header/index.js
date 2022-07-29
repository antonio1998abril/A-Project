import React from "react";
import { Navbar, Nav, Container, Image, NavDropdown } from "react-bootstrap";
import Link from "next/link";

function Index() {
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">A-Project</Navbar.Brand> 
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Charts</Nav.Link>
              <Nav.Link href="#pricing">Chats</Nav.Link>
              <NavDropdown title="Actions" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.3">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
    </>
  );
}

export default Index;

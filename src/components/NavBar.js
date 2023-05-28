import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            {/* ml pushed links nach rechts (vgl mr )
            text left pushed sie nach links auf kleinen screens*/}
            <Nav.Link>
              <i className="fas fa-home"></i>Home
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-sign-in-alt"></i>Sign in
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-user-plus"></i>Sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* Unser gesamter Hauptseiteninhalt wird in 
      Bootstrap-Containern verpackt, um zu verhindern, 
      dass er auf größeren Bildschirmen zu weit an den 
      Rändern verschoben wird. Um unsere 
      Navigationsleistenelemente in der gleichen Größe zu halten, 
      werden wir den Inhalt auch in einen Container einwickeln. */}
    </Navbar>
  );
};

export default NavBar;
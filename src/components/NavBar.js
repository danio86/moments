import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            {/* ml pushed links nach rechts (vgl mr )
            text left pushed sie nach links auf kleinen screens*/}
            <NavLink
              exact
              /* der ganze link muss exact "/" sein */
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signin"
            >
              <i className="fas fa-sign-in-alt"></i>Sign in
            </NavLink>
            <NavLink
              to="/signup"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fas fa-user-plus"></i>Sign up
            </NavLink>
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
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";



const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle;
    /* Übersetzung: Lassen Sie uns nun die Funktionalität behandeln, 
    damit das Burger-Menü zusammenklappt, wenn wir eine seiner Optionen auswählen.
    Zuerst werden wir eine ref-Variable instanziieren, die eine Referenz 
    zum Burger-Symbol enthält. Wir werden den useRef-Hook aus React verwenden 
    und importieren, da wir möchten, dass diese Referenz bestehen bleibt. */

const handleSignOut = async () => {
    try {
        await axios.post("dj-rest-auth/logout/");
        setCurrentUser(null);
    } catch (err) {
        console.log(err);
    }
    };
    /* Wenn der User auf Sign out klicked */

  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="far fa-plus-square"></i>Add post
    </NavLink>
  );

  const loggedInIcons = (
    /* alle links die der user sieht wenn er einen Accopunt hat */
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
        {/* linked zu Avatar.js wenn der User einen Avatar hat */}
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
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
    </>
  );

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
      {/* expanded kommt vom Hook > false (Burger ist nicht ausgefahren) */}
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>

        {currentUser && addPostIcon}
        {/* This way, it will only show the  addPostIcon if the 
        currentUser exists. */}

        <Navbar.Toggle
                ref={ref}
                onClick={() => setExpanded(!expanded)}
                /* expand to true */
                aria-controls="basic-navbar-nav"
                />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
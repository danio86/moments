import React, { useState } from "react";
/* useState hook kann aus statischen, funktionale commponents bilden */
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  /* das sind die ursprungswerte für signUpData */
  /* set SignUpData ist die Funktion, um diese Werte zu ändern*/
  const { username, password1, password2 } = signUpData;
  /* hier werden die Werte gleich in ein dict gegeben (destructuriert) */

  const [errors, setErrors] = useState({});
  /* der Hook wird aufgerufen, damit alle gespeicherten Errors angezeigt werden */

  const history = useHistory();
  /* das ist ein fertiger hook der zurück navigiert */
  /* der Import sollte oben automatisch funktionieren */

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
      /* das ist einfach ein key(name), value(value) paar */
      /* key = input feld, value ist das, was der user eingibt */
    });
  };
  /* ohne den handleChange können wir nichts in die Felder schreiben */
  /* Zunächst müssen wir die vorherige "signUpData" verteilen,
   damit wir nur das relevante Attribut aktualisieren müssen. 
   Hierfür werden wir die Funktion der berechneten Eigenschaftsnamen in 
   JavaScript verwenden und "event.target.name" auf "event.target.value" setzen. */

  const handleSubmit = async (event) => {
    event.preventDefault();
    /* damit die Seite nicht refreshed */
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
      /* wir sollten dann zu signin navigiert werden */
    } catch (err) {
      setErrors(err.response?.data);
      /* dieser error wird nach oben in den hook übergen */
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
              /* hier wird der error gerendert wenn es einen username error gibt */
              /* die message ist automatisch */
            ))}

            <Form.Group controlId="password1">
                {/* controlled id ist wie for */}
              <Form.Label className="d-none">Password</Form.Label>
              {/* Um die Dinge ordentlich zu halten und gleichzeitig unser Formular 
              für Bildschirmleser zugänglich zu machen, werden wir unser 
              Formularlabel mit der CSS-Klasse "d-none" ausblenden. */}
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                /* aus signupData */
                onChange={handleChange}
                /* der Handler wurde oben geschrieben */
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
                /* non-field:error! */
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"}
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
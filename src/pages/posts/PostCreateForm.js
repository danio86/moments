import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Alert from "react-bootstrap/Alert";
import { useRedirect } from "../../hooks/useRedirect";

function PostCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;

  const imageInput = useRef(null);
  /* wir brauchen den refhook um das image 
  an die api weiter zu geben */
  const history = useHistory();
  /* so that we can redirect our users */

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };
  /* erst alles was man inputten will definieren und den ursprungswert festlegen
  dann den neuen Wert im handelevent festlegen */

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
        /* wenn es eine Länge gibt, wurde ein file hochgeladen */
      URL.revokeObjectURL(image);
      /* Falls unser Benutzer beschließt, seine Bilddatei zu ändern, 
      nachdem er eine hinzugefügt hat,
      Wir müssen auch URL.revokeObjectURL aufrufen, 
      um den Verweis des Browsers auf die vorherige Datei zu löschen. */
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
        /* URL is eine React-method */
      });
    }
  };

  /* wie immer brauchen wir eine handel submit funktion */
  /* diese akzeptiert das submit event als Argument */
  const handleSubmit = async (event) => {
    event.preventDefault();
    /* verhindert submit wenn die Form nicht richtig ausgefüllt ist */
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      /* posts/ ist der Endpoint der API */
      history.push(`/posts/${data.id}`);
      /* der User wird nun hierher geleitet. 
      Wir haben also die url selbst definiert */
    } catch (err) {
    //   console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        /* nur wenn es kein 401 ist, wenn es einer ist
        kommt man gar nicht an diesen Punkt */
      }
    }
    /* Because we are sending an image file as  well as text to our API we need to refresh  
the user's access token before we make a  request to create a post. For this, we’ll  
import and use the axiosReq instance and post  the formData to the posts endpoint of our API */
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          /* die neuen Werte müssen noch hier rein */
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        /* title fragt nach dem errors key */
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                /* wenn es ein User-Bild gibt, render */
                /* der rest ist style */
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
                /* Falls er kein Bild hochgeladen hat... */
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                    /* die Asset component die message ist manuel */
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                /* das neue Bild muss auch übergeben werden, damit
                es gerendert werden kann. Durch accept muss es ein Bild sein */
                ref={imageInput}
                /* mit dem Hook wird es auch an die Api übergen */
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}


            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;
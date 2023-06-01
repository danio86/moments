import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function PostPage() {
  const { id } = useParams();
  /* fetching data about the post with the id that is in the url.
  to access URL parameters using the react router library:
  auto-import the useParams hook and destructure   */
  const [post, setPost] = useState({ results: [] });
  /* wenn wir eine einzelne api abfragen bekommen wir ein Object
  bei mehreren (posts/) bekommen wir eine list. 
  So (results: []) bekommen wir immer eine list */

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        /* der Hook macht ein request nach der data property und renamed
        to post */
        /* Was Promise.all tut, ist, dass es ein Array von Promises akzeptiert und aufgelöst wird, wenn alle Promises aufgelöst werden, wobei ein Array von Daten zurückgegeben wird. Wenn eines der Promises im Array fehlschlägt, wird Promise.all mit einem Fehler abgelehnt.
        In unserem Fall sind die zurückgegebenen Daten der
        angeforderte Post. */
        setPost({ results: [post] });
        /* to update the  results array in the state to contain that post. */
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);
/* run this code every time the  post id in the url changes */

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <p>Post component</p>
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;
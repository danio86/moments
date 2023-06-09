import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "./Post";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function PostsPage({ message, filter = "" }) {
    /* die funktion bekommt message und einen leeren filter als argument */
  const [posts, setPosts] = useState({ results: [] });
  /* dann holen wir uns die posts und setzten die results auf eine leere liste */
  const [hasLoaded, setHasLoaded] = useState(false);
  /* das ist ein loading spinner > false heißt es läd noch */
  const { pathname } = useLocation();
  /* We’ll also have to re-fetch posts again when  the user clicks between the home, feed and  
liked pages. To detect the url change, we’ll  auto-import the useLocation react router hook.
The useLocation hook comes  from the react-router library, and returns an object with data about
the current URL that the user is on. We need to know this to detect if the user has
flicked between home, feed and liked pages. */

  const [query, setQuery] = useState("");
  /* To handle our query value, we’ll use the useState  
hook again to destructure our query  variable and setQuery function.  */

const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        /* The request string will contain our filter  parameter, which comes from the filter prop  
we set in our routes. It will tell our  API if we want to see all the posts,  
just posts by the profiles our user has  followed, or just the posts they have liked. */
        setPosts(data);
        /* wenn es keinen err gibt, wird setPosts zu den gefetchten data gesetzt */
        setHasLoaded(true);
        
      } catch (err) {
        // console.log(err);
      }
    };
    /* das fetched die posts je nach filter oder rendert das loadin weel */

    setHasLoaded(false);
    const timer = setTimeout(() => {
        fetchPosts();
      }, 1000);
  
      return () => {
        clearTimeout(timer);
      };


  }, [filter, query, pathname, currentUser]);
  /* Well, we should run this effect every  time the filter or pathname change,  
so we’ll put these inside this  useEffect’s dependency array. */
/* oder wenn der seachtext geändert wird */

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        {/* hier wird das gerendert mit mibil classe */}
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        {/* kann man nicht sehen wegen unseren costom style css */}
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
          /* damit sich die seite nicht refreshed wenn man enter drückt */
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>


        {hasLoaded ? (
            /* wenn die daten geladen sind... */
          <>
            {posts.results.length ? (
                /* wenn das Ergebnis eine Länge hat, show */
                <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                /* die children sollen gerendert werden (genau so wie drunter) */
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                /* !! returned true für true values und false für ... 
                bei den apis gibts imm next wenn es noch eine gibt. sondt false*/
                next={() => fetchMoreData(posts, setPosts)}
              />
              /* das macht, dass posts beim runterscrallen geladen werden */
            
                /* We’ll map over the posts.results array.  
                For each, we’ll return our Post component, which  we need to auto-import.
                We’ll give it a key, spread the post object and pass the setPosts  
                function so that the users  can like and unlike the posts. */
              
            ) : (
                /* wenn nicht, 'no results' */
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
                {/* image wurde importiert */}
                {/* and the  message prop we passed to our PostsPage component. */}
                {/* der Container ist von Bootstrap */}
              </Container>
            )}
          </>
        ) : (
            /* sonst wird der spinner geladen */
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;
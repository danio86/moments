import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom";

const Post = (props) => {
    /* das destructurierte prop ist vom parent component
    man kann sich auch das api ergebnis ansehen */
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  /* Our post component will behave differently depending on if the currentUser is the owner of the post or not.
    So we’ll define a currentUser variable using the useCurrentUser hook exported from the
    currentUserContexts file. */
  const is_owner = currentUser?.username === owner;
  /* And using that variable we’ll check if the owner of the post matches the currentUser’s
    username, and assign the returned boolean value to the is_owner variable. */

  const history = useHistory();
  /* immer wenn wir den user redirecten wollen */

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };
  /* hierher wird der user directed */

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

const handleLike = async () => {
    /* handleLike async function so that the users can like posts.
    Inside a try-catch block, we’ll make a post request with the axiosRes instance
    to the likes endpoint with the post id, so that the API knows which post
    the user is trying to like. Again, we needed to auto-import axiosRes. */
    try {
        const { data } = await axiosRes.post("/likes/", { post: id });
        setPosts((prevPosts) => ({
            /* setPosts is vom Parrent(PostPage) */
        ...prevPosts,
        /* prevPosts wird gesreaded nach PrevPosts */
        results: prevPosts.results.map((post) => {
            return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
        /* Jetzt werden wir setPosts verwenden und ihm eine Funktion mit dem Argument prevPosts übergeben.
        Im Inneren werden wir die vorherigen Posts im Objekt ausbreiten und nur das results-Array aktualisieren.
        Wir werden es durchlaufen und dabei eine bedingte Anweisung verwenden, um zu überprüfen, ob die Post-ID mit der ID der gelikten Post übereinstimmt. Wenn sie übereinstimmt, geben wir das Post-Objekt zurück, bei dem die Anzahl der Likes um eins erhöht ist und like_id auf die ID der Antwortdaten gesetzt ist.
        Wenn die ID nicht übereinstimmt, geben wir einfach den Post zurück und führen keine weitere Aktion damit aus, damit unsere Schleife zum nächsten Post im results-Array von prevPosts wechseln kann. */
        }));
    } catch (err) {
        console.log(err);
    }
    };

const handleUnlike = async () => {
    try {
        await axiosRes.delete(`/likes/${like_id}/`);
        setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
            return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
        }));
    } catch (err) {
        console.log(err);
    }
    };

  return (
    <Card className={styles.Post}>
        {/* das ist ein react-bootstrap cart-component mit einer Klasse */}
        {/* dieses Component hat einen body... müssen alle importiert werden */}
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
              /* importierted Moredropdown von components */
            )}
            {/* check if the currently logged in user is the owner,
            and if the postPage prop exists, if so, then we know we
            want to display the edit and delete options for our user */}
            {/* postPage wurde von der destructurierung bzw. Mutter-comp
            übergeben */}
            {/* was wir dann machen (edid, delete) wird erstmal offen gelassen(...) */}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
        {/* pass the card image component */}
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        {/* We'll check if the title and content props have been passed 
        before we render the respective Bootstrap components. */}
        <div className={styles.PostBar}>
            {/* das werden die like and comment button */}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
                {/* To do that we’ll use and import the OverlayTrigger 
                and Tooltip components from Bootstrap. */}
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            /* checks if like-id exits, falls kann nicht nochmal geliked werden */
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            /* checks if user is difiniert/eingeloggt */
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            /* falls nicht eingelogged */
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
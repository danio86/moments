import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const Comment = (props) => {
    /* frce braucht props */
    const {
      profile_id,
      profile_image,
      owner,
      updated_at,
      content,
      id,
      setPost,
      setComments,
      /* die funktionen werden als props von postpage übergeben */
    } = props;

const currentUser = useCurrentUser();
/* hook muss importiert werden */
const is_owner = currentUser?.username === owner;
/* is current user = comment owner? */

const handleDelete = async () => {
try {
    await axiosRes.delete(`/comments/${id}/`);
    setPost((prevPost) => ({
    results: [
        {
        ...prevPost.results[0],
        comments_count: prevPost.results[0].comments_count - 1,
        /* Inside the array, we’ll spread the previous
        post object and reduce its comments_count by one. */
        /* jetzt muss das gelöschte Comment vom state entfernt werden 
        > setComments macht das*/
        },
    ],
    }));

    setComments((prevComments) => ({
    ...prevComments,
    results: prevComments.results.filter((comment) => comment.id !== id),
    }));
} catch (err) {}
};
/* So, we’ll call the setComments function and return  an object, where we’ll only update the results array.
We want to remove the comment that matches  our id here. So we’ll call the filter function to  
loop over the previous comments’ results array.  If the id is for the comment we want to remove,  
our filter method will not return  it into the updated results array. */

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
        </Media.Body>
        {is_owner && (
          <MoreDropdown handleEdit={() => {}} handleDelete={handleDelete} />
        )}
        {/* if owner is true && (und dann) render das MoreDropdown menu/compoonent */}
        {/* im dropdow kommt die beiden die edit und delete button rein 
        wenn eine von beiden fertig ist kommt sie in die KLammer. Sonst bleibt sie leer*/}
      </Media>
    </div>
  );
};

export default Comment;
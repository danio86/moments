import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

export const useRedirect = (userAuthStatus) => {
    /* wir schreiben und exportieren diesen hook */
  const history = useHistory();
  /* immer wenn wer zur homepage zurück soll */

  useEffect(() => {
    const handleMount = async () => {
        /* To be able to tell whether or not a user is logged in, we’ll need to make a network request on mount.
So, we’ll also need to auto-import the useEffect hook. */
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        // if user is logged in, the code below will run
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        // if user is not logged in, the code below will run
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};
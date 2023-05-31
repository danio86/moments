import { useEffect, useRef, useState } from "react";

/* useRef referenziert zu einem Element und speichert diese referenz
die untere Funktion bzw deren Wert wird immer mitübergeben
Der Bürger ist also aus- oder eingeklappt */

const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        /* we’ll check if the  
        user has clicked away from the referenced button.  
        If they have, we’ll call setExpanded with false, 
        which will close our dropdown menu */
        /* das event wird erst darunter definiert (mouseup) */
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      /* der eventlistener ausgeführt wird nzw die funktion,
      wird er wieder demontiert */
    };
  }, [ref]);
  /* läuft nur wenn ref geklicked wird */

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
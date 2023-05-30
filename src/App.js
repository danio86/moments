import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

/* Bevor wir über das Routing sprechen, importieren wir einen Container von Bootstrap, 
um unseren gesamten Hauptinhalt einzuschließen. 
In der Datei App.js importieren wir den Container mit 
"react-bootstrap/Container". Anschließend fügen wir unsere 
Container-Komponente unterhalb der Navbar hinzu. */

/* der router lässt inhalte je nach url anzeigen (wie if path) */
/* muss in index.js */

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
/* So, in order to make it more accessible,  we’ll use the useContext hook. The React  
documentation states that context provides  a convenient way to pass data required by  
many components in an application. Essentially,  Context is designed to share data that can be  
considered “global” to any child components that  need access to it */

/* jedes mal wenn die se Funktionen aufgerufen werden, 
wir ein neues Context Objekt kreiert */

function App() {

    const [currentUser, setCurrentUser] = useState(null);
    /* Hook mit Wert Null (User ist nicht eingelogged) */

    const handleMount = async () => {
      try {
        const { data } = await axios.get("dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      handleMount();
    }, []);
    /* wir checken hier EINMAL ob ein User eingelogged ist */


  return (
    <CurrentUserContext.Provider value={currentUser}>
        {/* jedes Context-Objekt hat einen Provider, 
        der den aktuellen Wert/Zustand beschreibt. In diesem fall
        wird der uste state Hook beschrieben.
        Dieser Zustand ist nun in jedem Child-Component, also alles im 
        folgendem DIV verfügbar! Hier muss der Zusatnd allerdings abgefragt
        werden */}
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={styles.App}>
        {/* styles wurde imported, App ist der Classname in App.module.css */}
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home page</h1>} />
              {/* wenn der route path matched, wird h1 gerendert */}
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
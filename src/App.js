import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
/* Bevor wir über das Routing sprechen, importieren wir einen Container von Bootstrap, 
um unseren gesamten Hauptinhalt einzuschließen. 
In der Datei App.js importieren wir den Container mit 
"react-bootstrap/Container". Anschließend fügen wir unsere 
Container-Komponente unterhalb der Navbar hinzu. */

/* der router lässt inhalte je nach url anzeigen (wie if path) */
/* muss in index.js */

function App() {
  return (
    <div className={styles.App}>
      {/* styles wurde imported, App ist der Classname in App.module.css */}
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          {/* wenn der route path matched, wird h1 gerendert */}
          <Route exact path="/signin" render={() => <h1>Sign in</h1>} />
          <Route exact path="/signup" render={() => <h1>Sign up</h1>} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
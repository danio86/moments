import styles from "./App.module.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className={styles.App}>
      {/* styles wurde imported, App ist der Classname in App.module.css */}
      <NavBar />
    </div>
  );
}

export default App;
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
/* der router lässt inhalte je nach url anzeigen (wie if path) */
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";


{/* React.StrictMode is a tool for highlighting
    potential problems in an application by running additional checks and 
    warnings on the application.
    And wraps around all of our other contexts and components */}
// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//     <CurrentUserProvider>
//         <ProfileDataProvider>
//           <App />
//         </ProfileDataProvider>
//       </CurrentUserProvider>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

ReactDOM.render(
    
      <Router>
      <CurrentUserProvider>
          <ProfileDataProvider>
            <App />
          </ProfileDataProvider>
        </CurrentUserProvider>
      </Router>,
    document.getElementById("root")
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/* wenn wir uns ausloggen umd auf die konsole gehen sehen wir:
Fehler, der uns mitteilt, dass findDOMNode in StrictMode veraltet ist. 
Da StrictMode nur für Entwicklungszwecke gedacht ist und wir uns auf die endgültige 
Bereitstellung vorbereiten, können wir es entfernen. */
/* StrictMode kann einfach entfernt werden */
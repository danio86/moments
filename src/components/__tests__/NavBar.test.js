import { render, screen, fireEvent } from "@testing-library/react";
/* das sind test die wir vorher geschrieben haben */
/* die tests müssen dann später abgerufen werden */
/* screen (musste nicht vorher geschrieben werden) testet ob check out the rendered HTML */
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );
  /* We need this because the NavBar component renders Router Link components.
Make sure you’re importing your custom NavBar component with the capital B */

  // screen.debug();
  const signInLink = screen.getByRole("link", { name: "Sign in" });
  /* wir testen ob der singnin-link vorhanden ist und nennen ihn singninLink
  und steuern ihn mit getByRole an
  den Name: muss exakt sein */
  expect(signInLink).toBeInTheDocument();
//   expect(signInLink).not.toBeInTheDocument();
  /* die Erwartung sollte zuerst einmal falsch sein */
});


/* test to check that the link to the user profile avatar is rendered in our NavBar */
/* Hier wird unsere Testbeschreibung lauten "rendert einen Link zum Benutzerprofil für einen 
angemeldeten Benutzer" und wir benötigen die Rückruffunktion als asynchron, da unser Test Daten abruft 
und auf Änderungen im Dokument warten muss. Unser Profil-Link wird nur angezeigt, 
wenn die currentUser-Daten abgerufen werden, daher müssen wir auch den CurrentUserProvider rendern. 
Lassen Sie uns das automatisch importieren und um unsere Navbar herum platzieren, 
innerhalb des Routers. */
test("renders link to the user profile for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByText("Profile");
  /* Da wir Elemente ansprechen müssen, die nicht beim Mounten vorhanden sind, 
  da sie als Ergebnis einer asynchronen Funktion angezeigt werden,
  sollten wir eine der find-Abfrage-Methoden mit dem await-Schlüsselwort verwenden. 
  Hier speichern wir das profileAvatar in einer Variable und finden es anhand des Texts "Profil"
  innerhalb der Avatar-Komponente. */
//   expect(profileAvatar).not.toBeInTheDocument();
  expect(profileAvatar).toBeInTheDocument();
});

/* test: dass nachdem der aktuell angemeldete Benutzer auf den Sign-out-Link geklickt hat, 
die Links für Sign-in und Sign-up wieder angezeigt werden. */
test("renders Sign in and Sign up buttons again on log out", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const signOutLink = await screen.findByRole("link", { name: "Sign out" });
  fireEvent.click(signOutLink);
  /* Um ein Benutzerklickereignis zu simulieren, können wir die fireEvent-Funktion aus der 
  React Testing Library importieren und sie verwenden, um den Klick auszulösen. */

  const signInLink = await screen.findByRole("link", { name: "Sign in" });
  const signUpLink = await screen.findByRole("link", { name: "Sign up" });

  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});
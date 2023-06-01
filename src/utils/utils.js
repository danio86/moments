import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        /* reduce loops durch die neue Seite of results */
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
          /* nur neue posts werden zugefügt */
      }, prevResource.results),
    }));
  } catch (err) {}
};

/* Im Inneren exportieren wir eine async-Funktion und nennen sie fetchMoreData.
Sie wird zwei Argumente akzeptieren: resource und setResource, damit wir verschiedene Arten von Daten für unsere InfiniteScroll-Komponente rendern und aktualisieren können.
Zum Beispiel könnten resource und setResource posts und setPosts oder comments und setComments sein.
Innerhalb eines try-catch-Blocks importieren wir automatisch die axiosReq-Instanz, um eine Netzwerkanforderung an resource.next zu stellen, was eine URL zur nächsten Seite der Ergebnisse ist.
Wenn kein Fehler auftritt, rufen wir setResource auf und übergeben ihm eine Rückruffunktion mit prevResource als Argument. Die Rückruffunktion gibt ein Objekt zurück, in dem wir prevResource ausbreiten. Wir aktualisieren auch das next-Attribut mit der URL zur nächsten Seite der Ergebnisse.
Wir müssen auch das results-Array aktualisieren, um die neu abgerufenen Ergebnisse einzuschließen und an die vorhandenen anzuhängen, die unser Zustand für den Benutzer rendert. Kannst du dir überlegen, welche der fortgeschrittenen JavaScript-Methoden map, filter oder reduce dafür verwendet werden kann?
Wenn du reduce geantwortet hast, gut gemacht! Wir können die reduce-Methode verwenden, um unsere neuen Posts zum prevResource.results-Array hinzuzufügen. Wenn du eine Erinnerung brauchst, wie die reduce-Methode funktioniert, findest du unten unter dem Video einen Link zu unseren Lektionen darüber. */
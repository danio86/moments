import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

/* refce */

const PopularProfiles = ({ mobile }) => {
    /* wir wollen hier unsere Profile anzeigen, denen wir folgen
    diese müssen wir aber erstmal fetchen */
  const [profileData, setProfileData] = useState({
    /* We’ll pass the useState hook an  object that has a popularProfiles attribute.  
We’ll set popularProfiles to an object  with an empty results array inside. */
    // we will use the pageProfile later!
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
    /* wir haben hier also 2 Attribute mit leeren listen als wert */
  });
  const { popularProfiles } = profileData;
//   destructure the  popularProfiles attribute
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
          /* die gefetcheten data werden sortiert */
        );
        setProfileData((prevState) => ({
          ...prevState,
          /* der ursprungszustand wird zerlegt */
          popularProfiles: data,
        //   und nur popularProfiels kommen in data bzw umgekehrt
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <Container 
        className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
        /* wenn es das mobil prob gibt (oben), dann zeige es in kleinen Bildschirmen
        in großen > hide */
      }`}
      >
      {popularProfiles.results.length ? (
        <>
          <p>Most followed profiles.</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                /* in der mobil ansicht werden max 4 nebeneinander angezeigt */
                <p key={profile.id}>{profile.owner}</p>
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <p key={profile.id}>{profile.owner}</p>
            ))
          )}
            {/* underneath the paragraph, we’ll map over the popularProfiles 
            results array. For each profile we’ll display a paragraph,
            passing its id as a key and its owner as text. */}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
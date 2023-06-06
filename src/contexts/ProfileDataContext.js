import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    // we will use the pageProfile later!
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  const handleFollow = async (clickedProfile) => {
    /* das Profil das der user anklicked ist das Argument */
    try {
      const { data } = await axiosRes.post("/followers/", {
        /* das erhaltene Objekt wird destructuriert und zum followers endpoint geschickt */
        followed: clickedProfile.id,
        /* die daten die gesendet werden, ist welches profil wurde angeklickt */
      });

      setProfileData((prevState) => ({
        /* wir rufen setprData auf und updaten nur popularProfiles
        Dann schauen wir ob der geklickte user schon gefollowed wird oder nicht
        Der code steht der profilePage und popularProfiles zu verfügung wenn wir ihn an utilis übergebn */
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
            /* We’ll call it(followhelper) on each profile with the profile itself, clickedProfile and data.id. */
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{ setProfileData, handleFollow, handleUnfollow }}>
      
        {/* we have to expose the handleFollow function in the ProfileDataContext.Provider
        so that the Profile components have access to it when the follow button is clicked. 
        muss jetzt noch geadded werden wo es benötigt wird*/}
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, userDefault } from "../../../../context/userContext";
import { getUserByUid } from "../../../../db/users/read.users";
import { User } from "../../../../utils";

const UserProfile = () => {
  const navigate = useNavigate();

  //   const { user } = useContext(UserContext);

  //   console.log("user", user.uid);
  //   console.log("aaa", user);

  //   useEffect(() => {
  //     if (user.uid === "") {
  //       navigate("/");
  //     }
  //   }, [user]);

  const [userProfile, setUserProfile] = useState<User>(userDefault);
  const fetchUser = async () => {
    const user = localStorage.getItem("token");
    if (user) {
      try {
        const userDb = await getUserByUid(user);
        if (userDb !== false && userDb !== true) {
          setUserProfile(userDb);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("userProfile", userProfile);
  }, [userProfile]);

  return (
    <div className="userprofile">
      <div className="profile__header">
        {/* <img className="profile_avatar" src={user.cover} alt="" />
        <h1 className="profile__title">{user.username}</h1> */}
        <p>Statistique Profile</p>
      </div>
      <div className="profile__content">
        <div className="victoire">
          <p>Victoire</p>
          <p>:</p>
          {/* <p>{user}</p> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import { UserContext } from "../../../context/userContext";
import { GameContext } from "../../../context/gameContext";
import { getAuth } from "firebase/auth";

const Qrcode = () => {
  //   const userContext = useContext(UserContext);
  const { setGameId } = useContext(GameContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (id === undefined) return navigate("/");
  //     if (userContext?.user !== undefined || userContext?.user !== null) {
  //       setGameId(parseInt(id));
  //       navigate(`/game/${id}/select-player`);
  //     } else {
  //     }
  //   }, [userContext?.user]);
  const getUser = async () => {
    return await new Promise((resolve, reject) => {
      getAuth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject(null);
        }
      });
    }).then((user) => {
      if (id === undefined) return navigate("/");
      if (user !== null || user !== undefined) {
        setGameId(parseInt(id));
        navigate(`/game/${id}/select-player`);
      } else {
        setGameId(parseInt(id));
        navigate(`/signin/${id}`);
      }
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  return <></>;
};

export default Qrcode;

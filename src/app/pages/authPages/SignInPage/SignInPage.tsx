import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { UserContext } from "../../../../context/userContext";
import { UserContextType } from "../../../../context/utils";

import SignIn from "../../../components/auth/SignIn";

import backgroundUser from "../../../../assets/background-user.svg";
import { GameContext } from "../../../../context/gameContext";

const SignInPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()

  const style: React.CSSProperties = {
    background: `url(${backgroundUser})`,
  };
  const { user } = useContext(UserContext) as UserContextType;
  const { setGameId } = useContext(GameContext)

  useEffect(() => {
    if(user === undefined) return
    if (user?.isAdmin && id) {
      setGameId(+id)
      navigate(`/game/${id}/start-game`);
    }else if(user.isAdmin && !id){
      navigate(`/game/create`);
    }else if(!user?.isAdmin && id){
      setGameId(+id)
      navigate(`/game/${id}/select-player`);
    }else{
      navigate(`/game`);
    }
  }, [])

  return (
    <Box sx={style} className="sign-in_page">
      <Box className="sign-in_content">
        <h2>Bienvenue !</h2>
        <h1>Se connecter</h1>
        <SignIn id={id} />
      </Box>
    </Box>
  );
};

export default SignInPage;

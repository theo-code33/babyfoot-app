import { useContext } from "react";
import { UserContext } from "../../../../context/userContext";
import UserGameConnect from "../../../components/game/user/UserGameConnect";
import GameCreate from "../GameCreate/GameCreate";
import { UserContextType } from "../../../../context/utils";

const GameStart = () => {
  const { user } = useContext(UserContext) as UserContextType;
  return (
    <>{user && user.isAdmin === true ? <GameCreate /> : <UserGameConnect />}</>
  );
};

export default GameStart;

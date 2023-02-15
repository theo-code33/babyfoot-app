import { useContext } from "react";
import { UserContext } from "../../../../context/userContext";
import AdminGameStart from "../../../components/game/admin/AdminGameStart";
import UserGameConnect from "../../../components/game/user/UserGameConnect";

const GameStart = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user.email == "admin@admin.com"
      ? <AdminGameStart/>
      : <UserGameConnect />
      }
    </>
  );
};

export default GameStart;

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameContext } from "../../../../context/gameContext";
import But from "../../../components/InGameActions/But";
import Demi from "../../../components/InGameActions/Demi";
import Gamelle from "../../../components/InGameActions/Gamelle";
import Swap from "../../../components/InGameActions/Swap/Swap";

const InGame = () => {
  const { game, setGame } = useContext(GameContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== game.id) {
      navigate("/game");
    }
  }, [id]);

  return (
    <div>
      <div>
        <h2>Point Équipe bleue :{game.blue.score}</h2>
        {/* <h2>{game.blue.users?[0].goals}</h2> */}
      </div>
      <div>
        <h2>Point Équipe rouge :{game.red.score}</h2>
      </div>
      <But />
      <Gamelle />
      <Swap />
      <Demi />
    </div>
  );
};

export default InGame;

import { useContext, useState } from "react";
import { Context } from "../../../../context/context";
import But from "../../../components/InGameActions/But";
import Gamelle from "../../../components/InGameActions/Gamelle";
import Swap from "../../../components/InGameActions/Swap/Swap";

const InGame = () => {
  const { game, setGame } = useContext(Context);
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
    </div>
  );
};

export default InGame;

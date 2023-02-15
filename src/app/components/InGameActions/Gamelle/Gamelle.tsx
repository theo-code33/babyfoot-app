import { useContext, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
import { ActionType, Team } from "../../../../context/utils";
import { updateDoc } from "../../../../db/game/setGame";

const Gamelle = ({
  setNewAction,
}: {
  setNewAction: (type: ActionType, team: Team) => void;
}) => {
  // const handlClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   console.log(e.currentTarget.value);
  //   const poste = determinerPosition(e.currentTarget.value);

  //   updateDoc({
  //     newDatas: {
  //       ...game,
  //       blue: {
  //         ...game.blue,
  //         score: gamelle === "+" ? game.blue.score + 1 : game.blue.score,
  //         users: game.blue.users?.map((user) => {
  //           if (user.playerPoste === poste) {
  //             user.goals = user.goals + 1;
  //             user.postes?.map((poste) => {
  //               if (poste.name === e.currentTarget.value) {
  //                 poste.goals = poste.goals + 1;
  //               }
  //             });
  //           }
  //           return user;
  //         }),
  //       },
  //       red: {
  //         ...game.red,
  //         score: gamelle === "-" ? game.red.score - 1 : game.red.score,
  //       },
  //     },
  //     collectionId: "games",
  //     docId: "kdniUnglQAtDDQERnsua",
  //   });
  //   setPositions(!positions);
  //   setChooseBonus(!chooseBonus);
  // };
  return (
    <div>
      <button onClick={() => setNewAction("Gamelle", "blue")}>Gamelle</button>
    </div>
  );
};

export default Gamelle;

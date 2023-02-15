import React, { useContext } from "react";
import { GameContext } from "../../../../context/gameContext";
import { updateDoc } from "../../../../db/game/setGame";

const Drawer = () => {
  const { game } = useContext(GameContext);

  // function determinerPosition(value: string): string {
  //   if (value === "AC" || value === "AG" || value === "AD" || value === "M") {
  //     return "Attaquant";
  //   } else if (
  //     value === "G" ||
  //     value === "DG" ||
  //     value === "DC" ||
  //     value === "DD"
  //   ) {
  //     return "Défenseur";
  //   } else {
  //     return "error";
  //   }
  // }
  // const handlClick = (e: any) => {
  //   console.log(e.target.value);
  //   const poste = determinerPosition(e.target.value);

  //   console.log(game.currentPoint);

  //   const points = game.blue.score + game.currentPoint;
  //   const team = "blue";

  //   console.log(points);

  //   const datas = {
  //     ...game,
  //     [team]: {
  //       ...game[team],
  //       score: game[team].score + game.currentPoint,
  //       users: game[team].users?.map((user) => {
  //         if (user.playerPoste === poste) {
  //           user.goals = user.goals + 1;
  //           user.postes?.map((poste) => {
  //             if (poste.name === e.target.value) {
  //               poste.goals = poste.goals + 1;
  //             }
  //           });
  //         }
  //         return user;
  //       }),
  //     },
  //     currentPoint: 1,
  //   };

  //   updateDoc({
  //     newDatas: datas,
  //     collectionId: "games",
  //     docId: game.id,
  //   });
  //   // setPositions(!positions);
  // };
  return (
    <div>
      <h1>dtcfghgvjbkn</h1>
      {/* {positions && (
        <div>
          <button value="AG" onClick={(e) => handlClick(e)}>
            AG
          </button>
          <button onClick={(e) => handlClick(e)} value="AC">
            AC
          </button>
          <button onClick={(e) => handlClick(e)} value="AD">
            AD
          </button>
          <button onClick={(e) => handlClick(e)} value="M">
            M
          </button>
          <button onClick={(e) => handlClick(e)} value="DG">
            DG
          </button>
          <button onClick={(e) => handlClick(e)} value="DC">
            DC
          </button>
          <button onClick={(e) => handlClick(e)} value="DD">
            DD
          </button>
          <button onClick={(e) => handlClick(e)} value="G">
            G
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Drawer;

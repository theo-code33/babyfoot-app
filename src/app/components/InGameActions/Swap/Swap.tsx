import { useContext } from "react";
import { Context } from "../../../../context/context";
import { updateDoc } from "../../../../db/game/setGame";

const Swap = () => {
  const { game, setGame } = useContext(Context);

  const handleClick = () => {
    console.log("click");

    updateDoc({
      newDatas: {
        ...game,
        blue: {
          ...game.blue,
          users: game.blue.users?.map((user) => {
            if (user.playerPoste === "Attaquant") {
              return {
                ...user,
                playerPoste: "Défenseur",
              };
            } else if (user.playerPoste === "Défenseur") {
              return {
                ...user,
                playerPoste: "Attaquant",
              };
            }
            return user;
          }),
        },
      },
      collectionId: "games",
      docId: "kdniUnglQAtDDQERnsua",
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Swap Team</button>
    </div>
  );
};

export default Swap;

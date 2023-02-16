import { ActionType, Team } from "../../../../context/utils";

const Gamelle = ({
  setNewAction,
  team,
}: {
  setNewAction: (type: ActionType, team: Team) => void;
  team: Team;
}) => {
  return (
    <div>
      <button onClick={() => setNewAction("Gamelle", team)}>Gamelle</button>
    </div>
  );
};

export default Gamelle;
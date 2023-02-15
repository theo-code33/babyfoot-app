import { ActionType, Team } from "../../../../context/utils";

const Technicals = ({
  setNewAction,
  team,
}: {
  setNewAction: (type: ActionType, team: Team) => void;
  team: Team;
}) => {
  return (
    <div>
      <button onClick={() => setNewAction("Techniques", team)}>Technicals</button>
    </div>
  );
};

export default Technicals;

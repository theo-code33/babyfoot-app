import { Action, Team } from "../../../../context/utils";

const Positions = ({
  action,
  handleClick,
}: {
  action: Action;
  handleClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    team: Team
  ) => void;
}) => {
  return (
    <div className="overlay-action">
      <h2>QUI A FAIT LA ROULETTE ?!</h2>
      <div className="btn-group">
        <button value="Attaquant" onClick={(e) => handleClick(e, action.team)}>
          Attaquant
        </button>

        <button value="Défenseur" onClick={(e) => handleClick(e, action.team)}>
          Défenseur
        </button>
      </div>
    </div>
  );
};

export default Positions;

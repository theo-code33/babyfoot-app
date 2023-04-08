import { Props } from "./utils";

const Positions: React.FC<Props> = ({
  action,
  handleClick,
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

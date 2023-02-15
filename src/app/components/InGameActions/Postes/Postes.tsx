import { Action, Team } from "../../../../context/utils";

const Postes = ({
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
    <div>
      <button value="AG" onClick={(e) => handleClick(e, action.team)}>
        AG
      </button>
      <button onClick={(e) => handleClick(e, action.team)} value="AC">
        AC
      </button>
      <button onClick={(e) => handleClick(e, action.team)} value="AD">
        AD
      </button>
      <button onClick={(e) => handleClick(e, action.team)} value="M">
        M
      </button>
      <button onClick={(e) => handleClick(e, action.team)} value="DG">
        DG
      </button>
      <button onClick={(e) => handleClick(e, action.team)} value="DD">
        DD
      </button>
      <button onClick={(e) => handleClick(e, action.team)} value="G">
        G
      </button>
    </div>
  );
};

export default Postes;

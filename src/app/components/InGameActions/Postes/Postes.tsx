import { Props } from "./utils";

const Postes: React.FC<Props> = ({
  action,
  handleClick,
  gamelle,
  technicalName,
}) => {
  return (
    <div
      className="postes"
      style={{
        display: action.postOverlay ? "flex" : "none",
      }}
    >
      <div className="poste-header">
        <h2>QUI A TIRÉ ?</h2>
        {action.type === "But" ? (
          <button
            onClick={(e) => handleClick(e, action.team)}
            value="CSC"
            className={
              action.team === "blue"
                ? "blue csc"
                : action.team === "red"
                ? "red csc"
                : ""
            }
          >
            CSC
          </button>
        ) : null}
      </div>
      <div
        className="match"
        style={gamelle != "" ? { filter: "none" } : { filter: "grayscale(100%)" }}
      >
        <div className="gardien">
          <button
            onClick={(e) => handleClick(e, action.team)}
            value="G"
            className={
              action.team === "blue"
                ? "blue"
                : action.team === "red"
                ? "red"
                : ""
            }
            disabled={
              (action.type === "Gamelle" && gamelle != "") ||
              action.type === "But" ||
              (action.type === "Techniques" && technicalName != "")
                ? false
                : true
            }
          >
            G
          </button>
        </div>

        <div className="defense">
          <button
            onClick={(e) => handleClick(e, action.team)}
            value="DG"
            className={
              action.team === "blue"
                ? "blue"
                : action.team === "red"
                ? "red"
                : ""
            }
            disabled={
              (action.type === "Gamelle" && gamelle != "") ||
              action.type === "But" ||
              (action.type === "Techniques" && technicalName != "")
                ? false
                : true
            }
          >
            DG
          </button>
          <button
            onClick={(e) => handleClick(e, action.team)}
            value="DD"
            className={
              action.team === "blue"
                ? "blue"
                : action.team === "red"
                ? "red"
                : ""
            }
            disabled={
              (action.type === "Gamelle" && gamelle != "") ||
              action.type === "But" ||
              (action.type === "Techniques" && technicalName != "")
                ? false
                : true
            }
          >
            DD
          </button>
        </div>

        <div className="milieu">
          <button
            onClick={(e) => handleClick(e, action.team)}
            value="M"
            className={
              action.team === "blue"
                ? "blue demi"
                : action.team === "red"
                ? "red demi"
                : ""
            }
            disabled={
              (action.type === "Gamelle" && gamelle != "") ||
              action.type === "But" ||
              (action.type === "Techniques" && technicalName != "")
                ? false
                : true
            }
          >
            M
          </button>
        </div>

        <div className="attaque">
          <button
            value="AG"
            onClick={(e) => handleClick(e, action.team)}
            className={
              action.team === "blue"
                ? "blue"
                : action.team === "red"
                ? "red"
                : ""
            }
            disabled={
              (action.type === "Gamelle" && gamelle != "") ||
              action.type === "But" ||
              (action.type === "Techniques" && technicalName != "")
                ? false
                : true
            }
          >
            AG
          </button>
          <button
            onClick={(e) => handleClick(e, action.team)}
            value="AC"
            className={
              action.team === "blue"
                ? "blue"
                : action.team === "red"
                ? "red"
                : ""
            }
            disabled={
              (action.type === "Gamelle" && gamelle != "") ||
              action.type === "But" ||
              (action.type === "Techniques" && technicalName != "")
                ? false
                : true
            }
          >
            AC
          </button>
          <button
            onClick={(e) => handleClick(e, action.team)}
            value="AD"
            className={
              action.team === "blue"
                ? "blue"
                : action.team === "red"
                ? "red"
                : ""
            }
            disabled={
              (action.type === "Gamelle" && gamelle != "") ||
              action.type === "But" ||
              (action.type === "Techniques" && technicalName != "")
                ? false
                : true
            }
          >
            AD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Postes;

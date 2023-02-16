import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import { signUp, signInWithGoogle } from "../../../../services/auth/auth.service";
import { DefaultUser } from "../../../../services/auth/utils";

const SignUp = ({id}: {id?: string}) => {
  const [user, setUser] = useState<DefaultUser>({
    email: "",
    username: "",
    password: "",
    goals: 0,
    postes: [
      {
        name: "AG",
        goals: 0,
      },
      {
        name: "AC",
        goals: 0,
      },
      {
        name: "AD",
        goals: 0,
      },
      {
        name: "M",
        goals: 0,
      },
      {
        name: "DG",
        goals: 0,
      },
      {
        name: "DD",
        goals: 0,
      },
      {
        name: "G",
        goals: 0,
      },
    ],
    fouls: [
      {
        name: "rateau",
        count: 0,
      },
      {
        name: "pisette",
        count: 0,
      },
      {
        name: "roulette",
        count: 0,
      },
    ],
    technicals: [
      {
        name: "cendar",
        count: 0,
      },
      {
        name: "lob",
        count: 0,
      },
      {
        name: "but incroyable",
        count: 0,
      },
    ],
    wins: 0,
    startedGames: 0,
  });
  const { setUser: setGlobalUser } = useContext(UserContext);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setSuccess(false);
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try{
      signUp(user, setGlobalUser);
      setSuccess(true);
      if(id){
        navigate(`/game/${id}/select-player`);
      }else{
        navigate("/game");
      }
    }catch(err){
      setError(true);
    }
  };

  const handleSignUpWithGoogle = async () => {
    await signInWithGoogle(setError, navigate, id)
  }

  return (
    <>
      <form>
        <input
          type="text"
          name="email"
          placeholder="Entrez votre email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          name="username"
          placeholder="Entrez votre username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Entrez votre mot de passe"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={(e) => handleClick(e)} type="submit">Validez</button>
      </form>
      <button onClick={handleSignUpWithGoogle}>Sign Up With Google</button>
      {
      id 
      ? <Link to={`/signin/${id}`}>
          J'ai déjà un compte
        </Link>
      : <Link to="/signin">
          J'ai déjà un compte
        </Link>
    }
    </>
  );
};

export default SignUp;

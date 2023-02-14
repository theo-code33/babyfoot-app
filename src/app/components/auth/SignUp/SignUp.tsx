import { useState } from "react";
import { signUp } from "../../../../services/auth/auth.service";
import { DefaultUser } from "../../../../services/auth/utils";

const SignUp = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signUp(user, setUser);
  };

  return (
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
      <button onClick={(e) => handleClick(e)}>Validez</button>
    </form>
  );
};

export default SignUp;

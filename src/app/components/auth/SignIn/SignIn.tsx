import { useContext, useState } from "react";
import { UserContext } from "../../../../context/userContext";
import { signIn } from "../../../../services/auth/auth.service";
import { Sign } from "../../../../services/auth/utils";

const SignIn = () => {
  const [user, setUser] = useState<Sign>({
    email: "",
    password: "",
  });
  const { setUser: setGlobalUser } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    console.log(user);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signIn(user, setGlobalUser);
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
        type="password"
        name="password"
        placeholder="Entrez votre mot de passe"
        onChange={(e) => handleChange(e)}
      />
      <button onClick={(e) => handleClick(e)}>Validez</button>
    </form>
  );
};

export default SignIn;

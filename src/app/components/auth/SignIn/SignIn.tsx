import { FormEventHandler, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import { signIn } from "../../../../services/auth/auth.service";
import { Sign } from "../../../../services/auth/utils";

const SignIn = () => {
  const [user, setUser] = useState<Sign>({
    email: "",
    password: "",
  });
  const { setUser: setGlobalUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(user, setGlobalUser);
    navigate("/game");
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Validez</button>
    </form>
  );
};

export default SignIn;

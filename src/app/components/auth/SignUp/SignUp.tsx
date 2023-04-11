import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Box, InputLabel, TextField, OutlinedInput, InputAdornment, IconButton } from "@mui/material"
import { VisibilityOff, Visibility } from '@mui/icons-material'

import { UserContext } from "../../../../context/userContext";
import { UserContextType } from "../../../../context/utils";

import { signUp, signInWithGoogle } from "../../../../services/auth/auth.service";
import { DefaultUser } from "../../../../services/auth/utils";

import logoGoogle from "../../../../assets/logo-google.png"
import { Props } from "./utils";

const SignUp: React.FC<Props> = ({id}) => {
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { setUser: setGlobalUser } = useContext(UserContext) as UserContextType;

  const navigate = useNavigate()

  const handleClickShowPassword = () : void => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) : void => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) : React.SetStateAction<void> => {
    setError(false);
    setSuccess(false);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement, MouseEvent>) : Promise<void> => {
    e.preventDefault();
    try{
      await signUp(user, setGlobalUser);
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

  const handleSignUpWithGoogle = async () : Promise<void> => {
    await signInWithGoogle(setError, navigate, id)
  }

  return (
    <Box className="sign-in-form_container">
      <Box component="form" onSubmit={handleSubmit} className="sign-in-form_content">
        <InputLabel htmlFor="email" className="sign-in-form_label">Email</InputLabel>
        <TextField
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          variant="outlined"
          onChange={handleChange}
          className="sign-in-form_input"
        />
        <InputLabel htmlFor="username" className="sign-in-form_label">Pseudo</InputLabel>
        <TextField
          type="text"
          name="username"
          id="username"
          placeholder="Pseudo"
          variant="outlined"
          onChange={handleChange}
          className="sign-in-form_input"
        />
        <InputLabel htmlFor="password" className="sign-in-form_label">Mot de passe</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          placeholder="Mot de passe"
          name="password"
          onChange={handleChange}
          className="sign-in-form_input"
        />
        {
          error && <span className="sign-in-form_error">Une erreur s'est produite. Veuillez réesayer</span>
        }
        <Button type="submit" variant="contained" className="sign-in-form_button">S'inscrire</Button>
      </Box>
      <Button onClick={handleSignUpWithGoogle} variant="contained" className="sign-in-form_button_google">
        <img src={logoGoogle} alt="logo google"/>
        Se connecter avec Google
      </Button>
      {
      id 
      ? <Link to={`/signin/${id}`} className="sign-in-form_link">
          J'ai déjà un compte
        </Link>
      : <Link to="/signin" className="sign-in-form_link">
          J'ai déjà un compte
        </Link>
    }
    </Box>
  );
};

export default SignUp;

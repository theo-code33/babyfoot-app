import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box,Button, TextField, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from '@mui/icons-material'

import { UserContext } from "../../../../context/userContext";

import { signIn, signInWithGoogle } from "../../../../services/auth/auth.service";
import { Sign } from "../../../../services/auth/utils";

import logoGoogle from "../../../../assets/logo-google.png"
import { Props } from "./utils";

const SignIn: React.FC<Props> = ({id}) => {
  const [user, setUser] = useState<Sign>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { setUser: setGlobalUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickShowPassword = () : void => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) : void => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    setError(false)
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) : Promise<void> => {
    e.preventDefault();
    try {
      await signIn(user, setGlobalUser);
      if(id){
        navigate(`/game/${id}/select-player`);
      }else{
        navigate("/game");
      }
    } catch (error) {
      setError(true)
    }
  };

  const handleSignIpWithGoogle = async () : Promise<void> => {
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
        <InputLabel htmlFor="outlined-adornment-password" className="sign-in-form_label">Mot de passe</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
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
        <Button type="submit" variant="contained" className="sign-in-form_button">Se connecter</Button>
      </Box>
      <Button onClick={handleSignIpWithGoogle} className="sign-in-form_button_google" variant="contained">
        <img src={logoGoogle} alt="logo google"/>
        Se connecter avec Google
      </Button>
      {
        id 
        ? <Link to={`/signup/${id}`} className="sign-in-form_link">
            Créer un compte
          </Link>
        : <Link to="/signup" className="sign-in-form_link">
            Créer un compte
          </Link>
      }
    </Box>
  );
};

export default SignIn;

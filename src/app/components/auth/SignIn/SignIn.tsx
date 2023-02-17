import React, { FormEventHandler, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import { signIn, signInWithGoogle } from "../../../../services/auth/auth.service";
import { Sign } from "../../../../services/auth/utils";
import { Box, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from '@mui/icons-material'

const SignIn = ({id}:{id?:string}) => {
  const [user, setUser] = useState<Sign>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { setUser: setGlobalUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(user, setGlobalUser);
    if(id){
      navigate(`/game/${id}/select-player`);
    }else{
      navigate("/game");
    }
  };

  const handleSignUpWithGoogle = async () => {
    await signInWithGoogle(setError, navigate, id)
  }

  return (
    <Box>
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="email"
        label="Email"
        variant="outlined"
        onChange={handleChange}
      />
      {/* <TextField
        type="password"
        name="password"
        label="Mot de passe"
        onChange={handleChange}
      /> */}
      <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
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
            label="Mot de passe"
            name="password"
            onChange={handleChange}
          />
        </FormControl>
      <button type="submit">Validez</button>
    </Box>
    <button onClick={handleSignUpWithGoogle}>Sign Up With Google</button>
    {
      id 
      ? <Link to={`/signup/${id}`}>
          Créer un compte
        </Link>
      : <Link to="/signup">
          Créer un compte
        </Link>
    }
    </Box>
  );
};

export default SignIn;

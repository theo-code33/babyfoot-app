import React, { FormEventHandler, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import { signIn, signInWithGoogle } from "../../../../services/auth/auth.service";
import { Sign } from "../../../../services/auth/utils";
import { Box,Button, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from '@mui/icons-material'
import logoGoogle from "../../../../assets/logo-google.png"

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
    setError(false)
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleSignUpWithGoogle = async () => {
    await signInWithGoogle(setError, navigate, id)
  }

  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  } as React.CSSProperties

  const styleForm = {
    ...style,
    alignItems: "flex-start",
  } as React.CSSProperties

  const styleLabel = {
    marginBottom: "10px",
    color: "black",
    fontFamily: "Poppins",
  } as React.CSSProperties

  const styleInput = {
    width: "100%",
    marginBottom: "10px",
    borderColor: "black",
  } as React.CSSProperties

  const styleButton = {
    width: "100%",
    marginTop: "20px",
    backgroundColor: "black",
    borderRadius: "0",
    padding: "15px 0",
    marginBottom: "15px",
    textTransform: "none",
    fontFamily: "Poppins",
    fontSize: "16px",
    '&:hover': {
      backgroundColor: "black",
      opacity: "0.8",
    }
  } as React.CSSProperties

  const styleButtonGoogle = {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "100px",
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "none",
    border: "0.5px solid black",
    boxShadow: "none",
    fontFamily: "Poppins",
    fontSize: "16px",
    marginBottom: "15px",
    '& img': {
      width: "30px",
      height: "30px",
      marginRight: "5px"
    }
  } as React.CSSProperties

  const styleLink = {
    textDecoration: "none",
    color: "black",
    opacity: "0.8",
    fontFamily: "Poppins"
  } as React.CSSProperties

  const styleError = {
    fontFamily: "Poppins",
    textAlign: "center",
    color: "red"
  } as React.CSSProperties

  return (
    <Box sx={style}>
      <Box component="form" onSubmit={handleSubmit} sx={styleForm}>
        <InputLabel htmlFor="email" sx={styleLabel}>Email</InputLabel>
        <TextField
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          variant="outlined"
          onChange={handleChange}
          sx={styleInput}
        />
        <InputLabel htmlFor="outlined-adornment-password" sx={styleLabel}>Mot de passe</InputLabel>
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
          sx={styleInput}
        />
        {
          error && <span style={styleError}>Une erreur s'est produite. Veuillez réesayer</span>
        }
        <Button type="submit" variant="contained" sx={styleButton}>Se connecter</Button>
      </Box>
      <Button onClick={handleSignUpWithGoogle} variant="contained" sx={styleButtonGoogle}>
        <img src={logoGoogle} alt="logo google"/>
        Se connecter avec Google
      </Button>
      {
        id 
        ? <Link to={`/signup/${id}`} style={styleLink}>
            Créer un compte
          </Link>
        : <Link to="/signup" style={styleLink}>
            Créer un compte
          </Link>
      }
    </Box>
  );
};

export default SignIn;

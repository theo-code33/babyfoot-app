import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import { signUp, signInWithGoogle } from "../../../../services/auth/auth.service";
import { DefaultUser } from "../../../../services/auth/utils";
import { Button, Box, InputLabel, TextField, OutlinedInput, InputAdornment, IconButton } from "@mui/material"
import { VisibilityOff, Visibility } from '@mui/icons-material'
import logoGoogle from "../../../../assets/logo-google.png"

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
  const [showPassword, setShowPassword] = useState(false);
  const { setUser: setGlobalUser } = useContext(UserContext);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setSuccess(false);
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
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
    color: "white",
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
        <InputLabel htmlFor="username" sx={styleLabel}>Pseudo</InputLabel>
        <TextField
          type="text"
          name="username"
          id="username"
          placeholder="Pseudo"
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
          error === true && <span style={styleError}>Une erreur s'est produite. Veuillez réesayer</span>
        }
        <Button type="submit" sx={styleButton}>S'inscrire</Button>
      </Box>
      <Button onClick={handleSignUpWithGoogle} variant="contained" sx={styleButtonGoogle}>
        <img src={logoGoogle} alt="logo google"/>
        Se connecter avec Google
      </Button>
      {
      id 
      ? <Link to={`/signin/${id}`} style={styleLink}>
          J'ai déjà un compte
        </Link>
      : <Link to="/signin" style={styleLink}>
          J'ai déjà un compte
        </Link>
    }
    </Box>
  );
};

export default SignUp;

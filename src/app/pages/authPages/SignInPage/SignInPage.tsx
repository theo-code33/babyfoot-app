import { useParams } from "react-router-dom";
import SignIn from "../../../components/auth/SignIn";
import { Box } from "@mui/material";
import backgroundUser from "../../../../assets/background-user.svg"

const SignInPage = () => {
  const {id} = useParams<{id: string}>();
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    backgroundSize: "cover !important",
    backgroundRepeat: "no-repeat",
    background: `url(${backgroundUser})`
  }
  const styleBox = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "80%",
    padding: "30px 20px",
    backgroundColor: "white"
  } as React.CSSProperties

  const styleH1 = {
    fontSize: "25px",
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "black",
    marginTop: "0px",
    marginBottom: "40px" 
  } as React.CSSProperties
  const styleH2 = {
    fontSize: "19px",
    fontFamily: "Poppins",
    fontWeight: "lighter",
    color: "black",
    marginTop: "0px",
    marginBottom: "10px" 
  } as React.CSSProperties

  return (
    <Box sx={style}>
      <Box sx={styleBox}>
        <h2 style={styleH2}>Bienvenue !</h2>
        <h1 style={styleH1}>Se connecter</h1>
        <SignIn id={id}/>
      </Box>
    </Box>
  );
};

export default SignInPage;

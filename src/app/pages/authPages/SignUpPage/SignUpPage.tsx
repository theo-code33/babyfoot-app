import { useParams } from "react-router-dom";
import SignUp from "../../../components/auth/SignUp";
import { Box } from "@mui/material"
import backgroundUser from "../../../../assets/background-user.svg"

const SignUpPage = () => {
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
  } as React.CSSProperties

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
    <Box style={style}>
      <Box sx={styleBox}>
        <h2 style={styleH2}>Bienvenue !</h2>
        <h1 style={styleH1}>Se connecter</h1>
        <SignUp id={id}/>
      </Box>
    </Box>
  );
};

export default SignUpPage;

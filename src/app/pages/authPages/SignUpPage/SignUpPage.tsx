import { useParams } from "react-router-dom";
import { Box } from "@mui/material"

import SignUp from "../../../components/auth/SignUp";

import backgroundUser from "../../../../assets/background-user.svg"

const SignUpPage = () => {
  const {id} = useParams<{id: string}>();

  const style = {
    background: `url(${backgroundUser})`
  } as React.CSSProperties

  return (
    <Box sx={style} className="sign-in_page">
      <Box className="sign-in_content">
        <h2>Bienvenue !</h2>
        <h1>S'inscrire</h1>
        <SignUp id={id}/>
      </Box>
    </Box>
  );
};

export default SignUpPage;

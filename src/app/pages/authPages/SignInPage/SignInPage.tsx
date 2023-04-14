import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { UserContext } from "../../../../context/userContext";
import { UserContextType } from "../../../../context/utils";

import SignIn from "../../../components/auth/SignIn";

import backgroundUser from "../../../../assets/background-user.svg";

const SignInPage = () => {
  const { id } = useParams<{ id: string }>();

  const style: React.CSSProperties = {
    background: `url(${backgroundUser})`,
  };
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <Box sx={style} className="sign-in_page">
      <Box className="sign-in_content">
        <h2>Bienvenue !</h2>
        <h1>Se connecter</h1>
        <SignIn id={id} />
      </Box>
    </Box>
  );
};

export default SignInPage;

import { useParams } from "react-router-dom";
import SignIn from "../../../components/auth/SignIn";
import { Box } from "@mui/material";
import backgroundUser from "../../../../assets/background-user.svg";
import { UserContext } from "../../../../context/userContext";
import { useContext } from "react";

const SignInPage = () => {
  const { id } = useParams<{ id: string }>();

  const style: React.CSSProperties = {
    background: `url(${backgroundUser})`,
  };
  const { user } = useContext(UserContext);

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

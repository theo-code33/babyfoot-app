import { Box } from "@mui/material";
import backgroundUser from "../../../../assets/background-user.svg";

const UserProfile = () => {
  const style: React.CSSProperties = {
    background: `url(${backgroundUser})`,
  };
  return (
    <Box sx={style}>
      <h1>UserProfile</h1>
    </Box>
  );
};

export default UserProfile;

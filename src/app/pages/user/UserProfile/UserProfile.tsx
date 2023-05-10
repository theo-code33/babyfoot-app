import { Avatar, Box, Grid } from "@mui/material";
import backgroundUser from "../../../../assets/background-user.svg";
import { UserContext } from "../../../../context/userContext";
import { useContext } from "react";

const UserProfile = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const style: React.CSSProperties = {
    background: `url(${backgroundUser})`,
    minWidth: "100vw",
    minHeight: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  if (user === undefined) return null;
  return (
    <Box sx={style}>
      <h1>Hello, {user.username} !</h1>
      <Box>
        <h2>My informations</h2>
        <Grid container width={"80%"} sx={{ margin: "auto" }}>
          <Grid item xs={4}>
            <Avatar alt={user.username} src={user.cover} />
          </Grid>
          <Grid item xs={8}>
            <p>Pseudo: {user.username}</p>
            <p>Email: {user.email}</p>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <h2>Mes stats</h2>
        <Grid container width={"80%"} sx={{ margin: "auto" }}>
          <Grid item xs={4}>
            <p>Matchs joués</p>
          </Grid>
          <Grid item xs={8}>
            <p>{user.playedGames ? user.playedGames : 0}</p>
          </Grid>
        </Grid>
        <Grid container width={"80%"} sx={{ margin: "auto" }}>
          <Grid item xs={4}>
            <p>Matchs gagnés</p>
          </Grid>
          <Grid item xs={8}>
            <p>{user.wins ? user.wins : 0}</p>
          </Grid>
        </Grid>
        <Grid container width={"80%"} sx={{ margin: "auto" }}>
          <Grid item xs={4}>
            <p>Buts</p>
          </Grid>
          <Grid item xs={8}>
            <p>{user.goals ? user.goals : 0}</p>
          </Grid>
        </Grid>
        <Grid container width={"80%"} sx={{ margin: "auto" }}>
          <Grid item xs={4}>
            <p>Goal Average</p>
          </Grid>
          <Grid item xs={8}>
            <p>
              {user.goals && user.playedGames
                ? user.goals / user.playedGames
                : 0}
            </p>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProfile;

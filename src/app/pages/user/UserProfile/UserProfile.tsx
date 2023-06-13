import { Avatar, Box, Grid, Typography } from "@mui/material";
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
      <Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "70px",
              }}
            >
              <Avatar
                alt={user.username}
                src={user.cover}
                sx={{
                  width: "100px",
                  height: "100px",
                  border: "2px solid #fff",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <Typography variant="h4">{user.username}</Typography>
                <Typography variant="h6">{user.email}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "30px",
              }}
            >
              <Typography variant="h4">Mes Statistiques</Typography>
              <Grid container p={2}>
                <Grid item xs={12} display={"flex"} flexDirection="row">
                  <Grid item xs={5}>
                    <Typography variant="h6">Parties jouées</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">:</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h6">
                      {user.playedGames ? user.playedGames : 0}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} display={"flex"} flexDirection="row">
                  <Grid item xs={5}>
                    <Typography variant="h6">Parties gagnées</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">:</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h6">
                      {user.wins ? user.wins : 0}
                    </Typography>
                  </Grid>
                </Grid>
                <Box></Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProfile;

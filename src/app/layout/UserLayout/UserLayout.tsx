import { Avatar, Box, Button, Menu, MenuItem } from "@mui/material";
import { UserLayoutProps } from "./utils";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { logOut } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    if (!userContext) return;
    await logOut(userContext.setUser);
    handleClose();
    navigate("/");
  };
  const handleProfile = () => {
    handleClose();
    navigate("/user/profile");
  };
  return (
    <>
      {userContext && userContext.user && !userContext.user.isAdmin ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
              position: "absolute",
              top: "20px",
              right: "20px",
            }}
          >
            <Button
              id="user-profile"
              aria-controls={open ? "user-profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar
                src={userContext.user.cover ? userContext?.user.cover : null}
              />
            </Button>
            <Menu
              id="user-profile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleProfile}>Mon profil</MenuItem>
              <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
            </Menu>
          </Box>
          {children}
        </Box>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default UserLayout;

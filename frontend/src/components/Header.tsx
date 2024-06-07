import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hook";
import { logOut } from "../redux/features/authSlice";
import * as Api from "../services/api";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Icon } from "@iconify/react";


function stringAvatar(name: string) {
  const nameParts = name.toUpperCase().split(" ");
  return {
    sx: {
      bgcolor: deepOrange[500],
    },
    children: `${nameParts[0][0]}${nameParts[1][0]}`,
  };
}

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(
    (state) => state.authState.accessToken
  ) as string;
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const init = async () => {
      const [err, res] = await Api.getProfile(token);
      if (err) {
      }
      setUser(res?.data);
    };
    init();
  }, []);

  const onLogoutHandler = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 3 }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Icon icon="la:dice" width="48" height="48"  style={{color: "#ff5900"}} />
          <Box display="flex" sx={{ ml: "auto" }}>
            {token && (
              <Button
                sx={{ backgroundColor: "#eee" }}
                onClick={onLogoutHandler}
              >
                Logout
              </Button>
            )}
            {user && (
              <Box sx={{ ml: 4 }}>
                <IconButton sx={{ p: 0 }}>
                  <Avatar
                    {...stringAvatar(`${user?.firstname} ${user.lastname}`)}
                  />
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

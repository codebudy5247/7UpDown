import { useEffect, useState } from "react";
import { Avatar, Box, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import { setCredentials } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/hook";
import * as Api from "../services/api";
import { toast } from "react-toastify";

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guestLoginLoading, setGuestLoginLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    const [err, res] = await Api.login(user.email, user.password);
    if (err) {
      toast.error(err?.data?.message);
    }
    if (res) {
      toast.success("Loggedin successfully");
      dispatch(setCredentials({ accessToken: res?.data?.accessToken }));
      navigate("/");
    }
    setLoading(false);
  };

  const guestLogin = async () => {
    setGuestLoginLoading(true);
    const [err, res] = await Api.login("aditya@example.com", "123456");
    if (err) {
      toast.error(err?.data?.message);
    }
    if (res) {
      toast.success("Loggedin successfully");
      dispatch(setCredentials({ accessToken: res?.data?.accessToken }));
      navigate("/");
    }
    setGuestLoginLoading(false);
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          sx={{
            mt: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Typography sx={{ fontSize: "0.9rem", mb: "1rem" }}>
            Need an account? <LinkItem to="/register">Sign Up Here</LinkItem>
          </Typography>

          <LoadingButton
            disabled={buttonDisabled}
            loading={loading}
            loadingPosition="start"
            startIcon={<LockIcon />}
            variant="contained"
            onClick={onLogin}
          >
            Login
          </LoadingButton>
          <LoadingButton
            loading={guestLoginLoading}
            loadingPosition="start"
            startIcon={<LockIcon />}
            variant="contained"
            onClick={guestLogin}
          >
            Guest Login
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

import { useEffect, useState } from "react";
import { Avatar, Box, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import * as Api from "../services/api";
import { toast } from "react-toastify";

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    setLoading(true);
    const [err, res] = await Api.register(
      user.firstname,
      user.lastname,
      user.email,
      user.password
    );
    if (err) {
        toast.error(err?.data?.message)
    }
    if (res) {
      toast.success("User registered successfully");
      navigate("/login");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (
      user.firstname.length > 0 &&
      user.lastname.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
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
            label="Firstname"
            variant="outlined"
            value={user.firstname}
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          />
          <TextField
            id="outlined-basic"
            label="Lastname"
            variant="outlined"
            value={user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          />
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
            Already have an account? <LinkItem to="/login">Login Here</LinkItem>
          </Typography>
          <LoadingButton
            disabled={buttonDisabled}
            loading={loading}
            loadingPosition="start"
            variant="contained"
            onClick={onRegister}
          >
            Register
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;

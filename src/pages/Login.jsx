import React, { useState } from "react";
import { useAuth } from "../hooks/UseAuth";
import { useUser } from "../hooks/UseUser";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import {
  TextField,
  Stack,
  Container,
  Typography,
  Paper,
  Box,
  InputLabel,
} from "@mui/material";
//import { useError } from "../context/UseError";

const Login = () => {
  //const { setError: setHeaderError } = useError();
  const { login } = useAuth();
  const { getUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const emailRegEx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (
      [
        !emailRegEx.test(email),
        email.length === 0,
        password.length < 9,
      ].includes(true)
    ) {
      setError(true);
      return;
    }
    try {
      setIsLoading(true);
      //setHeaderError(null);
      await login(email, password);
      console.log(
        getUser()[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
      );
      navigate("/");
    } catch (err) {
      console.log(err);
      //setHeaderError(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6}>
        <Box
          sx={{
            padding: "24px",
          }}
        >
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <Typography variant="h4">Administrator login</Typography>
              <InputLabel id="emailItem">Email</InputLabel>
              <TextField
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && !emailRegEx.test(email) ? (
                <label style={{ color: "#f44336" }}>
                  Please enter a valid email
                </label>
              ) : (
                ""
              )}
              {error && email.length === 0 ? (
                <label style={{ color: "#f44336" }}>
                  Email is a required field
                </label>
              ) : (
                ""
              )}
              <InputLabel id="passItem">Password</InputLabel>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && password.length < 9 ? (
                <label style={{ color: "#f44336" }}>
                  Password must be at least 9 characters long
                </label>
              ) : (
                ""
              )}
              <LoadingButton
                variant="contained"
                loading={isLoading}
                type="submit"
              >
                Log in
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

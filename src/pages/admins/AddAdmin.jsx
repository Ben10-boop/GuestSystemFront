import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../hooks/UseAdmins";
import { useError } from "../../context/UseError";

const AddAdmin = () => {
  const { setError: setHeaderError } = useError();
  const { postAdmin } = useAdmins();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const navigate = useNavigate();
  const emailRegEx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if ([!emailRegEx.test(email), password !== passwordConf].includes(true)) {
      setError(true);
      return;
    }
    if ([name, email, password, passwordConf].includes("")) {
      setEmptyError(true);
      return;
    }
    try {
      setIsLoading(true);
      setHeaderError(null);
      await postAdmin(name, email, password);
      navigate("/admins");
    } catch (err) {
      console.log(err);
      setHeaderError(err.response.data);
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
          <form onSubmit={handleAddAdmin}>
            <Stack spacing={2}>
              <Typography variant="h5">Add new administrator</Typography>
              <InputLabel>Name</InputLabel>
              <TextField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputLabel id="maxPayloadInput">Email</InputLabel>
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
              <InputLabel>Password</InputLabel>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputLabel>Confirm password</InputLabel>
              <TextField
                type="password"
                value={passwordConf}
                onChange={(e) => setPasswordConf(e.target.value)}
              />
              {error && password !== passwordConf ? (
                <label style={{ color: "#f44336" }}>Passwords must match</label>
              ) : (
                ""
              )}
              {emptyError ? (
                <label style={{ color: "#f44336" }}>
                  All fields are required
                </label>
              ) : (
                ""
              )}
              <LoadingButton
                variant="contained"
                loading={isLoading}
                type="submit"
              >
                Submit
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddAdmin;

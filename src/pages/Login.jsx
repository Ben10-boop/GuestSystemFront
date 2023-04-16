import React, { useState } from "react";
import { useAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Stack,
  Container,
  Typography,
  Paper,
  Box,
  InputLabel,
} from "@mui/material";
import { useError } from "../context/UseError";

const Login = () => {
  const { setError: setHeaderError } = useError();
  const { login } = useAuth();
  const { t } = useTranslation();
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
      setHeaderError(null);
      await login(email, password);
      navigate("/home");
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
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <Typography variant="h4">{t("admin_login")}</Typography>
              <InputLabel id="emailItem">{t("email")}</InputLabel>
              <TextField
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && !emailRegEx.test(email) ? (
                <label style={{ color: "#f44336" }}>
                  {t("err_invalid_email")}
                </label>
              ) : (
                ""
              )}
              <InputLabel id="passItem">{t("password")}</InputLabel>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && password.length < 9 ? (
                <label style={{ color: "#f44336" }}>
                  {t("err_pass_too_short")}
                </label>
              ) : (
                ""
              )}
              <LoadingButton
                variant="contained"
                loading={isLoading}
                type="submit"
              >
                {t("log_in")}
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

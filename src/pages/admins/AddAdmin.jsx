import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../hooks/UseAdmins";
import { useError } from "../../context/UseError";

const AddAdmin = () => {
  const { setError: setHeaderError } = useError();
  const { t } = useTranslation();
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
    if (
      [
        !emailRegEx.test(email) && email !== "",
        password !== passwordConf,
      ].includes(true)
    ) {
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
              <Typography variant="h5">{t("add_admin")}</Typography>
              <InputLabel>{t("name")}</InputLabel>
              <TextField
                inputProps={{
                  "data-testid": "name_field",
                }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputLabel id="maxPayloadInput">{t("email")}</InputLabel>
              <TextField
                inputProps={{
                  "data-testid": "email_field",
                }}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && !emailRegEx.test(email) && email !== "" ? (
                <label
                  style={{ color: "#f44336" }}
                  data-testid="err_invalid_email"
                >
                  {t("err_invalid_email")}
                </label>
              ) : (
                ""
              )}
              <InputLabel>{t("password")}</InputLabel>
              <TextField
                inputProps={{
                  "data-testid": "password_field",
                }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputLabel>{t("password_conf")}</InputLabel>
              <TextField
                inputProps={{
                  "data-testid": "password_conf_field",
                }}
                type="password"
                value={passwordConf}
                onChange={(e) => setPasswordConf(e.target.value)}
              />
              {error && password !== passwordConf ? (
                <label
                  style={{ color: "#f44336" }}
                  data-testid="err_passwords_match"
                >
                  {t("err_pass_match")}
                </label>
              ) : (
                ""
              )}
              {emptyError ? (
                <label
                  style={{ color: "#f44336" }}
                  data-testid="err_all_fields_req"
                >
                  {t("err_all_fields_req")}
                </label>
              ) : (
                ""
              )}
              <LoadingButton
                data-testid="submit_button"
                variant="contained"
                loading={isLoading}
                type="submit"
              >
                {t("submit")}
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddAdmin;

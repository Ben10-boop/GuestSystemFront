/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useAdmins } from "../../hooks/UseAdmins";
import { useError } from "../../context/UseError";

const EditAdmin = () => {
  const { setError: setHeaderError } = useError();
  const { putAdmin, getAdmin } = useAdmins();
  const { t } = useTranslation();
  const [details, setDetails] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const emailRegEx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  let params = useParams();

  useEffect(() => {
    getAdmin(params.identifier).then((data) => setDetails(data));
    console.log(details);
  }, [params.identifier]);

  const handleEditAdmin = async (e) => {
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
    try {
      setIsLoading(true);
      setHeaderError(null);
      await putAdmin(params.identifier, name, email, password);
      navigate("/admins");
    } catch (err) {
      console.log(err);
      if (err.response.data.status) {
        setHeaderError(
          err.response.data.status + " " + err.response.data.title
        );
      } else {
        setHeaderError(err.response.data);
      }
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
          <form onSubmit={handleEditAdmin}>
            <Stack spacing={2}>
              <Typography variant="h5">
                {t("view_edit_admin")} {params.identifier}
              </Typography>
              <InputLabel>
                {t("name")} : {details["name"]}
              </InputLabel>
              <TextField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputLabel>
                {t("email")} : {details["email"]}
              </InputLabel>
              <TextField
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && !emailRegEx.test(email) && email !== "" ? (
                <label style={{ color: "#f44336" }}>
                  {t("err_invalid_email")}
                </label>
              ) : (
                ""
              )}
              <InputLabel>{t("password")}</InputLabel>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputLabel>{t("password_conf")}</InputLabel>
              <TextField
                type="password"
                value={passwordConf}
                onChange={(e) => setPasswordConf(e.target.value)}
              />
              {error && password !== passwordConf ? (
                <label style={{ color: "#f44336" }}>
                  {t("err_pass_match")}
                </label>
              ) : (
                ""
              )}
              <LoadingButton
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

export default EditAdmin;

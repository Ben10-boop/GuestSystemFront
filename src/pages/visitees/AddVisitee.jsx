import React, { useState } from "react";
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
import { useVisitees } from "../../hooks/UseVisitees";
//import { useError } from "../../context/UseError";

const AddVisitee = () => {
  //const { setError: setHeaderError } = useError();
  const { postVisitee } = useVisitees();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const navigate = useNavigate();
  const emailRegEx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  const handleAddVisitee = async (e) => {
    e.preventDefault();
    if ([!emailRegEx.test(email) && email !== ""].includes(true)) {
      setError(true);
      return;
    }
    if ([name, email].includes("")) {
      setEmptyError(true);
      return;
    }
    try {
      setIsLoading(true);
      //setHeaderError(null);
      await postVisitee(name, email);
      navigate("/visitees");
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
          <form onSubmit={handleAddVisitee}>
            <Stack spacing={2}>
              <Typography variant="h5">{t("add_visitee")}</Typography>
              <InputLabel>{t("name")}</InputLabel>
              <TextField
                inputProps={{
                  "data-testid": "name_field",
                }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputLabel>{t("email")}</InputLabel>
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

export default AddVisitee;

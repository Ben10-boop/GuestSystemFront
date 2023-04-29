import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  InputLabel,
  TextField,
  Alert,
  Paper,
} from "@mui/material";
import { useForms } from "../../hooks/UseForms";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EndVisit = () => {
  const { getRecentForms, endVisit } = useForms();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [Forms, setForms] = useState([]);
  const [name, setName] = useState("");
  const [valuesChanged, setValuesChanged] = useState(true);
  const [error, setError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValuesChanged(false);
    handleGetForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesChanged]);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const handleGetForms = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      setForms(await getRecentForms());
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndVisit = async () => {
    if ([name].includes("")) {
      setEmptyError(true);
      return;
    }
    try {
      setIsLoading(true);
      var id = -1;
      Forms.every((element) => {
        if (element.name === name) {
          id = element.id;
          return false;
        }
        return true;
      });
      if (id !== -1) {
        await endVisit(id);
        setSuccess(true);
        await timeout(5000);
        navigate("/");
      } else {
        setError(true);
        return;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ height: "70vh" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, marginLeft: 5 }}
        >
          {t("end_visit")}
        </Typography>
        <Box display="flex">
          <Stack
            display="flex"
            spacing={2}
            sx={{
              maxWidth: "100vw",
              overflowX: "hidden",
              padding: "24px",
            }}
          >
            <Paper
              elevation={6}
              sx={{
                padding: 2,
              }}
            >
              <form onSubmit={handleEndVisit}>
                <InputLabel>{t("end_visit_expl")}</InputLabel>
                <Box display="flex">
                  <TextField
                    inputProps={{
                      "data-testid": "name_field",
                    }}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ marginRight: 5 }}
                  />
                  <LoadingButton
                    data-testid="submit_button"
                    variant="contained"
                    loading={isLoading}
                    type="button"
                    onClick={() => handleEndVisit()}
                  >
                    {t("submit")}
                  </LoadingButton>

                  {error ? (
                    <label
                      data-testid="err_name_not_found"
                      style={{ color: "#f44336" }}
                    >
                      {t("err_name_not_found")}
                    </label>
                  ) : (
                    ""
                  )}
                  {emptyError ? (
                    <label style={{ color: "#f44336" }}>
                      {t("err_enter_name_first")}
                    </label>
                  ) : (
                    ""
                  )}
                </Box>
              </form>
            </Paper>
            {success ? (
              <Alert severity="success">
                {t("alert_visit_end_upd_success")}
              </Alert>
            ) : (
              ""
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default EndVisit;

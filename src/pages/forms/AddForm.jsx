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
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForms } from "../../hooks/UseForms";
import { useVisitees } from "../../hooks/UseVisitees";
import { useTranslation } from "react-i18next";
//import { useError } from "../../context/UseError";

const AddForm = () => {
  //const { setError: setHeaderError } = useError();
  const { postForm } = useForms();
  const { getVisitees } = useVisitees();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [entranceTimeDate, setEntranceTimeDate] = useState("");
  const [entranceTimeHour, setEntranceTimeHour] = useState(0);
  const [entranceTimeMinute, setEntranceTimeMinute] = useState(0);
  const [departureTimeDate, setDepartureTimeDate] = useState("");
  const [departureTimeHour, setDepartureTimeHour] = useState(0);
  const [departureTimeMinute, setDepartureTimeMinute] = useState(0);
  const [visiteeId, setVisiteeId] = useState("");
  const [visitees, setVisitees] = useState([]);
  const [visiteeValuesChanged, setVisiteeValuesChanged] = useState(true);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const navigate = useNavigate();
  const emailRegEx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  useEffect(() => {
    setVisiteeValuesChanged(false);
    handleGetVisitees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visiteeValuesChanged]);

  const handleGetVisitees = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      //setHeaderError(null);
      setVisitees(await getVisitees());
    } catch (err) {
      console.log(err);
      //setHeaderError(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const getDateString = (date, hour, minute) => {
    const adjustedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const adjustedMinute = minute < 10 ? `0${minute}` : `${minute}`;
    return new Date(`${date}T${adjustedHour}:${adjustedMinute}`).toJSON();
  };

  const handleCheckBoxTick = (e) => {
    setChecked(e.target.checked);
  };

  const handleAddForm = async (e) => {
    e.preventDefault();
    if (
      [
        // !emailRegEx.test(email),
        email !== "" && !emailRegEx.test(email),
      ].includes(true)
    ) {
      setError(true);
      return;
    }
    if (
      [
        name,
        email,
        purpose,
        entranceTimeDate,
        departureTimeDate,
        visiteeId,
      ].includes("")
    ) {
      setEmptyError(true);
      return;
    }
    try {
      setIsLoading(true);
      //setHeaderError(null);
      await postForm(
        name,
        email,
        purpose,
        "",
        getDateString(entranceTimeDate, entranceTimeHour, entranceTimeMinute),
        getDateString(
          departureTimeDate,
          departureTimeHour,
          departureTimeMinute
        ),
        visiteeId,
        checked ? "granted" : "not requested"
      );
      navigate("/Forms");
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
          <form onSubmit={handleAddForm}>
            <Stack spacing={2}>
              <Typography variant="h5">{t("add_form")}</Typography>
              <InputLabel>{t("guest_name")}</InputLabel>
              <TextField
                inputProps={{
                  "data-testid": "guest_name_field",
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
              {error && email !== "" && !emailRegEx.test(email) ? (
                <label
                  style={{ color: "#f44336" }}
                  data-testid="invalid_email_err"
                >
                  {t("err_invalid_email")}
                </label>
              ) : (
                ""
              )}
              <InputLabel>{t("purpose")}</InputLabel>
              <TextField
                inputProps={{
                  "data-testid": "purpose_field",
                }}
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
              <InputLabel>
                {t("entrance_time")} {t("date_time_param")}
              </InputLabel>
              <Box display="flex">
                <TextField
                  inputProps={{
                    "data-testid": "entr_time_date_field",
                  }}
                  sx={{
                    padding: "2px",
                  }}
                  type="date"
                  value={entranceTimeDate}
                  onChange={(e) => setEntranceTimeDate(e.target.value)}
                />
                <Select
                  inputProps={{
                    "data-testid": "entr_time_hour_field",
                  }}
                  sx={{
                    margin: "2px",
                  }}
                  value={entranceTimeHour}
                  onChange={(e) => setEntranceTimeHour(e.target.value)}
                >
                  {[...Array(24)].map((x, i) => {
                    return (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Select
                  inputProps={{
                    "data-testid": "entr_time_min_field",
                  }}
                  sx={{
                    margin: "2px",
                  }}
                  value={entranceTimeMinute}
                  onChange={(e) => setEntranceTimeMinute(e.target.value)}
                >
                  {[...Array(60)].map((x, i) => {
                    return (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Box>
              <InputLabel>
                {t("departure_time")} {t("date_time_param")}
              </InputLabel>
              <Box display="flex">
                <TextField
                  inputProps={{
                    "data-testid": "depart_time_date_field",
                  }}
                  sx={{
                    padding: "2px",
                  }}
                  type="date"
                  value={departureTimeDate}
                  onChange={(e) => setDepartureTimeDate(e.target.value)}
                />
                <Select
                  inputProps={{
                    "data-testid": "depart_time_hour_field",
                  }}
                  sx={{
                    margin: "2px",
                  }}
                  value={departureTimeHour}
                  onChange={(e) => setDepartureTimeHour(e.target.value)}
                >
                  {[...Array(24)].map((x, i) => {
                    return (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Select
                  inputProps={{
                    "data-testid": "depart_time_min_field",
                  }}
                  sx={{
                    margin: "2px",
                  }}
                  value={departureTimeMinute}
                  onChange={(e) => setDepartureTimeMinute(e.target.value)}
                >
                  {[...Array(60)].map((x, i) => {
                    return (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Box>
              <InputLabel>{t("empl_being_visited")}</InputLabel>
              <Select
                inputProps={{
                  "data-testid": "visitee_field",
                }}
                id="statusSelectThing"
                value={visiteeId}
                onChange={(e) => setVisiteeId(e.target.value)}
              >
                {visitees.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </Select>
              {emptyError ? (
                <label
                  data-testid="err_all_fields_req"
                  style={{ color: "#f44336" }}
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

export default AddForm;

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
import { format } from "date-fns";
//import { useError } from "../../context/UseError";

const AddForm = () => {
  //const { setError: setHeaderError } = useError();
  const { postForm } = useForms();
  const { getVisitees } = useVisitees();
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
    return new Date(`${date}T${adjustedHour}:${adjustedMinute}`).toUTCString;
  };

  const handleCheckBoxTick = (e) => {
    // const departHour =
    //   departureTimeHour < 10 ? `0${departureTimeHour}` : `${departureTimeHour}`;
    // const departMinute =
    //   departureTimeMinute < 10
    //     ? `0${departureTimeMinute}`
    //     : `${departureTimeMinute}`;
    // const someDate = `${departureTimeDate}T${departHour}:${departMinute}`;
    //console.log(someDate);
    //console.log(format(new Date(someDate), "MM-dd HH:mm"));
    //console.log(e.target.checked);
    setChecked(e.target.checked);
  };

  const handleAddForm = async (e) => {
    e.preventDefault();
    if ([!emailRegEx.test(email)].includes(true)) {
      setError(true);
      return;
    }
    if ([name, purpose].includes("")) {
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
              <Typography variant="h5">
                Add new Guest form submission
              </Typography>
              <InputLabel>Guest name</InputLabel>
              <TextField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputLabel>Visit purpose</InputLabel>
              <TextField
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
              <InputLabel>Entrance time (Date; Hour; Minute)</InputLabel>
              <Box display="flex">
                <TextField
                  sx={{
                    padding: "2px",
                  }}
                  type="date"
                  value={entranceTimeDate}
                  onChange={(e) => setEntranceTimeDate(e.target.value)}
                />
                <Select
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
              <InputLabel>Departure time (Date; Hour; Minute)</InputLabel>
              <Box display="flex">
                <TextField
                  sx={{
                    padding: "2px",
                  }}
                  type="date"
                  value={departureTimeDate}
                  onChange={(e) => setDepartureTimeDate(e.target.value)}
                />
                <Select
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
              <InputLabel>Employee being visited</InputLabel>
              <Select
                id="statusSelectThing"
                value={visiteeId}
                onChange={(e) => setVisiteeId(e.target.value)}
              >
                {visitees.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <InputLabel id="maxPayloadInput">Grant wifi access</InputLabel>
              <Checkbox
                checked={checked}
                onChange={handleCheckBoxTick}
                inputProps={{ "aria-label": "controlled" }}
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

export default AddForm;

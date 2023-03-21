/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  TextField,
  Stack,
  Container,
  Typography,
  Paper,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useVisitees } from "../../hooks/UseVisitees";
//import { useError } from "../../context/UseError";

const EditVisitee = () => {
  //const { setError: setHeaderError } = useError();
  const { putVisitee, getVisitee } = useVisitees();
  const [details, setDetails] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const emailRegEx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  let params = useParams();

  useEffect(() => {
    getVisitee(params.identifier).then((data) => setDetails(data));
    console.log(details);
  }, [params.identifier]);

  const handleEditVisitee = async (e) => {
    e.preventDefault();
    if ([!emailRegEx.test(email)].includes(true) && email !== "") {
      setError(true);
      return;
    }
    try {
      setIsLoading(true);
      //setHeaderError(null);
      await putVisitee(params.identifier, name, email, status);
      navigate("/visitees");
    } catch (err) {
      console.log(err);
      // if (err.response.data.status) {
      //   setHeaderError(err.response.data.status + " " + err.response.data.title);
      // } else {
      //   setHeaderError(err.response.data);
      // }
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
          <form onSubmit={handleEditVisitee}>
            <Stack spacing={2}>
              <Typography variant="h5">
                View, edit visitable employee {params.identifier}
              </Typography>
              <InputLabel>Name : {details["name"]}</InputLabel>
              <TextField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputLabel>Email : {details["email"]}</InputLabel>
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
              <InputLabel>Status : {details["status"]}</InputLabel>
              <Select
                id="statusSelectThing"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={"visitable"}>Visitable</MenuItem>
                <MenuItem value={"unvisitable"}>Unvisitable</MenuItem>
              </Select>
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

export default EditVisitee;

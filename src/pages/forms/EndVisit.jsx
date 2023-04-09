import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, InputLabel, TextField, Alert, Paper } from "@mui/material";
import { useForms } from "../../hooks/UseForms";
import { LoadingButton } from "@mui/lab";

const EndVisit = () => {
  const { getRecentForms, endVisit } = useForms();
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
        var id = -1
        Forms.every(element => {
            if(element.name === name){
                id = element.id;
                return false;
            }
            return true;
        });
        if(id !== -1){
            await endVisit(id);
            setSuccess(true);
        }else{
            setError(true);
            return;
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
  }

  return (
    <Box>
      <Box sx={{ height: "70vh" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, marginLeft: 5 }}
        >
          End Visit
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
        <Paper elevation={6} sx={{
          padding: 2
        }}>
        <form onSubmit={handleEndVisit}>
        <InputLabel>Enter your name and click "submit" to update the departure time of your most recent visit to the current time</InputLabel>
        <Box display="flex">
        <TextField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginRight: 5 }}
              />
              <LoadingButton
                    variant="contained"
                    loading={isLoading}
                    type="button"
                    onClick={() => handleEndVisit()}
                  >
                    Submit
                  </LoadingButton>
              {error ? (
                <label style={{ color: "#f44336" }}>
                  The entered name was not found
                </label>
              ) : (
                ""
              )}
              {emptyError ? (
                <label style={{ color: "#f44336" }}>
                  Please enter your name first
                </label>
              ) : (
                ""
              )}
        </Box>
        </form>
        </Paper>
        {success ? (
                <Alert severity="success">Visit end updated successfully</Alert>
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
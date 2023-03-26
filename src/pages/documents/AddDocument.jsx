import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDocuments } from "../../hooks/UseDocuments";

const AddDocument = () => {
  const { postDocument } = useDocuments();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [uplFile, setUplFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    setUplFile(e.target.files[0]);
    //console.log(e.target.files[0]);
    getBase64(e.target.files[0]);
  };

  const onLoad = (fileString) => {
    //console.log(fileString);
    setContent(fileString);
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();
    if ([title, status].includes("")) {
      setEmptyError(true);
      return;
    }
    if (!uplFile.type) {
      setError(true);
      return;
    }
    if (uplFile.type !== "application/pdf") {
      setError(true);
      return;
    }
    try {
      setIsLoading(true);
      await postDocument(title, content, status);
      navigate("/Documents");
    } catch (err) {
      console.log(err);
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
          <form onSubmit={handleAddDocument}>
            <Stack spacing={2}>
              <Typography variant="h5">Add new additional document</Typography>
              <InputLabel>Title</InputLabel>
              <TextField
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <InputLabel id="maxPayloadInput">Status</InputLabel>
              <Select
                id="statusSelectThing"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"inactive"}>Inactive</MenuItem>
              </Select>
              <InputLabel>Content</InputLabel>
              <input
                type="file"
                name="file"
                accept="application/pdf"
                onChange={(e) => handleFileUpload(e)}
              />
              {error && !uplFile.type ? (
                <label style={{ color: "#f44336" }}>Please upload a file</label>
              ) : (
                ""
              )}
              {error && uplFile.type !== "application/pdf" ? (
                <label style={{ color: "#f44336" }}>
                  Uploaded file must be in .pdf format
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

export default AddDocument;

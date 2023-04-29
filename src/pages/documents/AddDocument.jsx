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
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDocuments } from "../../hooks/UseDocuments";

const AddDocument = () => {
  const { postDocument } = useDocuments();
  const { t } = useTranslation();
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
              <Typography variant="h5">{t("add_document")}</Typography>
              <InputLabel>{t("title")}</InputLabel>
              <TextField
                inputProps={{
                  "data-testid": "title_field",
                }}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <InputLabel id="maxPayloadInput">{t("status")}</InputLabel>
              <Select
                inputProps={{
                  "data-testid": "status_field",
                }}
                id="statusSelectThing"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"inactive"}>Inactive</MenuItem>
              </Select>
              <InputLabel>{t("content")}</InputLabel>
              <input
                data-testid="file_upload_field"
                type="file"
                name="file"
                accept="application/pdf"
                onChange={(e) => handleFileUpload(e)}
              />
              {error && !uplFile.type ? (
                <label data-testid="err_no_file" style={{ color: "#f44336" }}>
                  {t("err_no_file")}
                </label>
              ) : (
                ""
              )}
              {error && uplFile.type !== "application/pdf" ? (
                <label
                  data-testid="err_file_must_be_pdf"
                  style={{ color: "#f44336" }}
                >
                  {t("err_file_must_be_pdf")}
                </label>
              ) : (
                ""
              )}
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

export default AddDocument;

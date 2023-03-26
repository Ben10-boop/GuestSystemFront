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
  Pagination,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDocuments } from "../../hooks/UseDocuments";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "../../PdfStyle.css";

const EditDocument = () => {
  const { putDocument, getDocument } = useDocuments();
  const [details, setDetails] = useState({});
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [uplFile, setUplFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  let params = useParams();

  useEffect(() => {
    getDocument(params.identifier).then((data) => setDetails(data));
    console.log(details);
  }, [params.identifier]);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const options = {
    standardFontDataUrl: "standard_fonts/",
  };

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

  const handleChangePage = (event, value) => {
    setPageNumber(value);
  };

  const handleEditDocument = async (e) => {
    e.preventDefault();
    if (uplFile.type) {
      if (uplFile.type !== "application/pdf") {
        setError(true);
        return;
      }
    }
    try {
      setIsLoading(true);
      await putDocument(params.identifier, title, content, status);
      navigate("/Documents");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Container maxWidth="xs">
        <Paper elevation={6}>
          <Box
            sx={{
              padding: "24px",
            }}
          >
            <form onSubmit={handleEditDocument}>
              <Stack spacing={2}>
                <Typography variant="h5">
                  View, edit document {params.identifier}
                </Typography>
                <InputLabel>Title : {details["title"]}</InputLabel>
                <TextField
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <InputLabel>Status : {details["status"]}</InputLabel>
                <Select
                  id="statusSelectThing"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={"active"}>Active</MenuItem>
                  <MenuItem value={"inactive"}>Inactive</MenuItem>
                </Select>
                <InputLabel>
                  Content: (Preview current content below)
                </InputLabel>
                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={(e) => handleFileUpload(e)}
                />
                {error && uplFile.type !== "application/pdf" ? (
                  <label style={{ color: "#f44336" }}>
                    Uploaded file must be in .pdf format
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
      <div className="Example__container">
        <div className="Example__container__document">
          <Document
            file={details["content"]}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="10vh"
          >
            <Pagination
              justifycontent="center"
              count={numPages}
              page={pageNumber}
              onChange={handleChangePage}
            ></Pagination>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default EditDocument;

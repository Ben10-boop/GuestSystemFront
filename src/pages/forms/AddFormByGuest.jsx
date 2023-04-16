import React, { useState, useEffect, useRef } from "react";
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
  Dialog,
  DialogTitle,
  DialogActions,
  Pagination,
  Button,
  Alert,
} from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "../../PdfStyle.css";
import { useNavigate } from "react-router-dom";
import { addMinutes, addHours } from "date-fns";
import { useForms } from "../../hooks/UseForms";
import { useVisitees } from "../../hooks/UseVisitees";
import { useDocuments } from "../../hooks/UseDocuments";
import { useTranslation } from "react-i18next";
import CanvasDraw from "react-canvas-draw";
//import { useError } from "../../context/UseError";

const AddFormByGuest = () => {
  //const { setError: setHeaderError } = useError();
  const { postForm } = useForms();
  const { getVisitees } = useVisitees();
  const { getActiveDocuments } = useDocuments();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [departureTimeHour, setDepartureTimeHour] = useState(0);
  const [departureTimeMinute, setDepartureTimeMinute] = useState(0);
  const [visiteeId, setVisiteeId] = useState("");
  const [visitees, setVisitees] = useState([]);
  const [visiteeValuesChanged, setVisiteeValuesChanged] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [docValuesChanged, setDocValuesChanged] = useState(true);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [dialogOpenId, setDialogOpenId] = useState(-1);
  const [signDialogOpen, setSignDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const emailRegEx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  useEffect(() => {
    setVisiteeValuesChanged(false);
    handleGetVisitees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visiteeValuesChanged]);

  useEffect(() => {
    setDocValuesChanged(false);
    handleGetDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docValuesChanged]);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const options = {
    standardFontDataUrl: "standard_fonts/",
  };

  const handleChangePage = (event, value) => {
    setPageNumber(value);
  };

  const handleOpenDialog = (id) => {
    setDialogOpenId(id);
  };

  const handleCloseDialog = () => {
    setDialogOpenId(-1);
    setPageNumber(1);
  };

  const hadleOpenSignDialog = () => {
    if ([name, purpose, visiteeId, email].includes("")) {
      setEmptyError(true);
      return;
    }
    if (
      [
        !emailRegEx.test(email),
        // email !== "" && !emailRegEx.test(email),
      ].includes(true)
    ) {
      setError(true);
      return;
    }
    setSignDialogOpen(true);
  };

  const hadleCloseSignDialog = () => {
    setSignDialogOpen(false);
  };

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

  const handleGetDocuments = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      //setHeaderError(null);
      setDocuments(await getActiveDocuments());
    } catch (err) {
      console.log(err);
      //setHeaderError(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleCheckBoxTick = (e) => {
  //   setChecked(e.target.checked);
  // };

  const handleAddForm = async () => {
    try {
      setIsLoading(true);
      const EntranceDate = new Date(Date.now());
      //setHeaderError(null);
      await postForm(
        name,
        email,
        purpose,
        canvasRef.current.canvasContainer.children[1].toDataURL(),
        EntranceDate.toJSON(),
        addMinutes(
          addHours(EntranceDate, departureTimeHour),
          departureTimeMinute
        ).toJSON(),
        visiteeId,
        checked ? "granted" : "not requested"
      );
      setSignDialogOpen(false);
      setSuccess(true);
      await timeout(5000);
      navigate("/");
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
              <Typography variant="h5">{t("add_new_guest_form")}</Typography>
              <InputLabel>{t("full_name")}</InputLabel>
              <TextField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputLabel>{t("purpose")}</InputLabel>
              <TextField
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
              <InputLabel>{t("planned_duration")}</InputLabel>
              <Box display="flex">
                <Select
                  sx={{
                    margin: "2px",
                  }}
                  value={departureTimeHour}
                  onChange={(e) => setDepartureTimeHour(e.target.value)}
                >
                  {[...Array(13)].map((x, i) => {
                    return (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    );
                  })}
                </Select>
                <InputLabel>{t("h")}</InputLabel>
                <Select
                  sx={{
                    margin: "2px",
                  }}
                  value={departureTimeMinute}
                  onChange={(e) => setDepartureTimeMinute(e.target.value)}
                >
                  <MenuItem key={-1} value={0}>
                    0
                  </MenuItem>
                  {[15, 30, 45].map((x, i) => {
                    return (
                      <MenuItem key={i} value={x}>
                        {x}
                      </MenuItem>
                    );
                  })}
                </Select>
                <InputLabel>min</InputLabel>
              </Box>
              <InputLabel>{t("empl_being_visited")}</InputLabel>
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
              {/* <InputLabel id="maxPayloadInput">{t("need_wifi")}</InputLabel>
              <Checkbox
                checked={checked}
                onChange={handleCheckBoxTick}
                inputProps={{ "aria-label": "controlled" }}
              /> */}
              <InputLabel id="maxPayloadInput">{t("email")}</InputLabel>
              <TextField
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* {error && checked && email === "" ? (
                <label style={{ color: "#f44336" }}>
                  {t("err_email_req_if_wifi")}
                </label>
              ) : (
                ""
              )} */}
              {error && email !== "" && !emailRegEx.test(email) ? (
                <label style={{ color: "#f44336" }}>
                  {t("err_invalid_email")}
                </label>
              ) : (
                ""
              )}
              {emptyError ? (
                <label style={{ color: "#f44336" }}>
                  {t("err_all_fields_req")}
                </label>
              ) : (
                ""
              )}
              <InputLabel>{t("view_add_docs")}:</InputLabel>
              <div className="Example__container">
                <div className="Example__container__document">
                  {documents.map((item) => {
                    return (
                      <Box key={item.id}>
                        <Button
                          type="button"
                          variant="text"
                          onClick={() => {
                            handleOpenDialog(item.id);
                          }}
                        >
                          {item.title}
                        </Button>
                        <Dialog
                          open={dialogOpenId === item.id}
                          onClose={handleCloseDialog}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          maxWidth="xl"
                        >
                          <Document
                            file={item.content}
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
                          <DialogActions>
                            <Button onClick={() => handleCloseDialog()}>
                              {t("close")}
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Box>
                    );
                  })}
                </div>
              </div>
              <Dialog
                open={signDialogOpen}
                onClose={hadleCloseSignDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xl"
              >
                <DialogTitle id="alert-dialog-title">
                  {t("draw_signature")}
                </DialogTitle>
                <CanvasDraw ref={canvasRef} />
                <DialogActions>
                  <Button
                    variant="text"
                    type="button"
                    onClick={() => hadleCloseSignDialog()}
                  >
                    {t("cancel")}
                  </Button>
                  <LoadingButton
                    variant="contained"
                    loading={isLoading}
                    type="button"
                    onClick={() => handleAddForm()}
                  >
                    {t("submit")}
                  </LoadingButton>
                </DialogActions>
              </Dialog>
              <Button
                variant="contained"
                type="button"
                onClick={() => hadleOpenSignDialog()}
              >
                {t("sign_form")}
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
      {success ? (
        <Alert sx={{ marginTop: 3 }} severity="success">
          {t("alert_sub_save_success")}
        </Alert>
      ) : (
        ""
      )}
    </Container>
  );
};

export default AddFormByGuest;

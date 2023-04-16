/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Stack,
  Container,
  Typography,
  Paper,
  Box,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Link,
  Pagination,
  Dialog,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForms } from "../../hooks/UseForms";
import { useVisitees } from "../../hooks/UseVisitees";
import { format } from "date-fns";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "../../PdfStyle.css";
//import { useError } from "../../context/UseError";

const EditForm = () => {
  //const { setError: setHeaderError } = useError();
  const { putForm, getForm, getFormDocuments } = useForms();
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
  const [visiteeId, setVisiteeId] = useState(-1);
  const [visitees, setVisitees] = useState([]);
  const [visiteeValuesChanged, setVisiteeValuesChanged] = useState(true);
  const [formDocuments, setFormDocuments] = useState([]);
  const [formDocValuesChanged, setFormDocValuesChanged] = useState(true);
  const [checked, setChecked] = useState(false);
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [dialogOpenId, setDialogOpenId] = useState(-1);
  const navigate = useNavigate();
  const emailRegEx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  let params = useParams();

  useEffect(() => {
    getForm(params.identifier).then((data) => setDetails(data));
  }, [params.identifier]);

  useEffect(() => {
    setVisiteeValuesChanged(false);
    handleGetVisitees();
  }, [visiteeValuesChanged]);

  useEffect(() => {
    setFormDocValuesChanged(false);
    handleGetFormDocuments();
  }, [formDocValuesChanged]);

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

  const handleGetFormDocuments = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      //setHeaderError(null);
      setFormDocuments(await getFormDocuments(params.identifier));
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
    setChecked(e.target.checked);
  };

  const handleEditForm = async (e) => {
    e.preventDefault();
    if (
      [
        checked &&
          details["wifiAccessStatus"] === "not requested" &&
          !emailRegEx.test(email),
        email !== "" && !emailRegEx.test(email),
      ].includes(true)
    ) {
      setError(true);
      return;
    }
    try {
      setIsLoading(true);
      //setHeaderError(null);
      await putForm(
        params.identifier,
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
        checked ? "granted" : ""
      );
      navigate("/Forms");
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
    <div>
      <Container maxWidth="xs">
        <Paper elevation={6}>
          <Box
            sx={{
              padding: "24px",
            }}
          >
            <form onSubmit={handleEditForm}>
              <Stack spacing={2}>
                <Typography variant="h5">
                  {t("view_edit_form")} {params.identifier}
                </Typography>
                <InputLabel>
                  {t("guest_name")} : {details["name"]}
                </InputLabel>
                <TextField
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <InputLabel>
                  {t("purpose")} : {details["visitPurpose"]}
                </InputLabel>
                <TextField
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                />
                <InputLabel>
                  {t("entrance_time")} :{" "}
                  {details["entranceTime"]
                    ? format(new Date(details["entranceTime"]), "MM-dd HH:mm")
                    : ""}
                </InputLabel>
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
                <InputLabel>
                  {t("departure_time")} :{" "}
                  {details["departureTime"]
                    ? format(new Date(details["departureTime"]), "MM-dd HH:mm")
                    : ""}
                </InputLabel>
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
                <InputLabel>
                  {t("empl_being_visited")} :{" "}
                  {visitees[details["visiteeId"]]
                    ? visitees[details["visiteeId"]].name
                    : ""}
                </InputLabel>
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
                  <MenuItem key={-1} value={-1}>
                    ({t("unchanged")})
                  </MenuItem>
                </Select>
                {/* <InputLabel id="maxPayloadInput">
                  {t("need_wifi")} : {details["wifiAccessStatus"]}
                </InputLabel>
                <Checkbox
                  checked={checked}
                  onChange={handleCheckBoxTick}
                  inputProps={{ "aria-label": "controlled" }}
                />
                {!checked && details["wifiAccessStatus"] === "granted" ? (
                  <label style={{ color: "#c79538" }}>
                    {t("alert_wifi_already_granted")}
                  </label>
                ) : (
                  ""
                )} */}
                <InputLabel>
                  {t("email")} : {details["email"]}
                </InputLabel>
                <TextField
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error &&
                checked &&
                details["wifiAccessStatus"] === "not requested" &&
                email === "" ? (
                  <label style={{ color: "#f44336" }}>
                    {t("err_email_req_if_wifi")}
                  </label>
                ) : (
                  ""
                )}
                {email !== "" && !emailRegEx.test(email) ? (
                  <label style={{ color: "#f44336" }}>
                    {t("err_invalid_email")}
                  </label>
                ) : (
                  ""
                )}
                <LoadingButton
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
      <Container maxWidth="xs">
        <Paper elevation={6}>
          <Typography
            variant="h6"
            sx={{
              padding: "24px",
            }}
          >
            {t("signature")}:
          </Typography>
          {details["signature"] ? (
            <img src={details["signature"]} alt="Form signature"></img>
          ) : (
            <InputLabel
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              ({t("not_signed")})
            </InputLabel>
          )}
        </Paper>
      </Container>
      <Container maxWidth="xs">
        <Paper elevation={6}>
          <div className="Example__container">
            <div className="Example__container__document">
              <InputLabel>{t("signed_docs")}:</InputLabel>
              {formDocuments.map((item) => {
                return (
                  <Box key={item.id}>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => {
                        handleOpenDialog(item.id);
                      }}
                    >
                      {item.title}
                    </Link>
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
        </Paper>
      </Container>
    </div>
  );
};

export default EditForm;

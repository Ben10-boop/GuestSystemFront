import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForms } from "../hooks/UseForms";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { getActiveGuests, getActiveForms, sendAlarm } = useForms();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [alarmMessage, setAlarmMessage] = useState(
    "There is an emergency, please evacuate the building!"
  );
  const [alarmDialogOpen, setAlarmDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [Forms, setForms] = useState([]);
  const [Guests, setGuests] = useState([]);
  const [formValuesChanged, setFormValuesChanged] = useState(true);
  const [guestValuesChanged, setGuestValuesChanged] = useState(true);

  useEffect(() => {
    setFormValuesChanged(false);
    handleGetForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValuesChanged]);

  useEffect(() => {
    setGuestValuesChanged(false);
    handleGetGuests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestValuesChanged]);

  const handleGetForms = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      setForms(await getActiveForms());
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetGuests = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      setGuests(await getActiveGuests());
      //console.log(Guests);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendAlarm = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      setAlarmDialogOpen(false);
      await sendAlarm(alarmMessage);
      setSuccess(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const hadleOpenAlarmDialog = () => {
    setAlarmDialogOpen(true);
  };

  const hadleCloseAlarmDialog = () => {
    setAlarmDialogOpen(false);
  };

  return (
    <Box>
      <Grid container columns={{ sm: 4, md: 8 }}>
        <Grid item sm={4} md={8}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: 5 }}
          >
            {t("welcome_to_admin_home")}
          </Typography>
        </Grid>
        {/* <Box
          display="flex"
          sx={{
            justifyContent: "center",
          }}
        > */}
        <Grid item sm={4}>
          <Stack
            display="flex"
            spacing={2}
            sx={{
              maxWidth: "100vw",
              overflowX: "hidden",
              padding: "24px",
            }}
          >
            <Typography variant="h5">{t("active_guests_by_forms")}</Typography>
            <TableContainer
              component={Paper}
              elevation={6}
              sx={{
                width: "100%",
                maxWidth: 960,
                overflowX: "auto",
              }}
            >
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>{t("guest_name")}</TableCell>
                    <TableCell>{t("purpose")}</TableCell>
                    <TableCell>{t("departure_time")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Forms.map((item) => {
                    return (
                      <TableRow
                        key={item.id}
                        data-testid={`table_row_${item.id}`}
                      >
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.visitPurpose}</TableCell>
                        <TableCell>
                          {item.departureTime ? (
                            format(new Date(item.departureTime), "MM-dd HH:mm")
                          ) : (
                            <label>{t("not_set")}</label>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <LoadingButton
              data-testid="table_alarm_dialog_btn"
              variant="contained"
              loading={isLoading}
              onClick={() => {
                hadleOpenAlarmDialog();
              }}
            >
              {t("send_alarm")}
            </LoadingButton>
            {success ? (
              <Alert sx={{ marginTop: 3 }} severity="success">
                {t("alert_alarm_success")}
              </Alert>
            ) : (
              ""
            )}
            <Dialog
              open={alarmDialogOpen}
              onClose={hadleCloseAlarmDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="xl"
            >
              <DialogTitle id="alert-dialog-title">
                {t("send_alarm_title")}
              </DialogTitle>
              <TextField
                id="filled-multiline-static"
                label={t("mail_content")}
                multiline
                rows={5}
                value={alarmMessage}
                variant="filled"
                onChange={(e) => setAlarmMessage(e.target.value)}
                sx={{
                  margin: "10px",
                }}
              />
              <DialogActions>
                <Button
                  variant="text"
                  type="button"
                  onClick={() => hadleCloseAlarmDialog()}
                >
                  {t("cancel")}
                </Button>
                <Button
                  data-testid="alarm_dialog_conf_btn"
                  variant="contained"
                  type="button"
                  onClick={() => handleSendAlarm()}
                >
                  {t("send")}
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </Grid>
        <Grid item sm={4}>
          <Stack
            spacing={2}
            display="flex"
            sx={{
              maxWidth: "100vw",
              overflowX: "hidden",
              padding: "24px",
            }}
          >
            <Typography variant="h5">{t("active_guests_by_wifi")}</Typography>
            <TableContainer
              component={Paper}
              elevation={6}
              sx={{
                width: "100%",
                maxWidth: 960,
                overflowX: "auto",
              }}
            >
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>{t("guest_name")}</TableCell>
                    <TableCell>{t("empl_being_visited")}</TableCell>
                    <TableCell>{t("wifi_status")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Guests.map((item, index) => {
                    return (
                      <TableRow
                        key={index}
                        data-testid={`guest_table_row_${index}`}
                      >
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.personBeingVisited}</TableCell>
                        <TableCell>{item.status}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Grid>
        {/* </Box> */}
      </Grid>
    </Box>
  );
};

export default Home;

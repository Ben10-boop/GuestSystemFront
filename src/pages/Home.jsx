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
  Paper,
} from "@mui/material";
import { useForms } from "../hooks/UseForms";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { getActiveGuests, getActiveForms } = useForms();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <Box>
      <Box>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginLeft: 5 }}
        >
          {t("welcome_to_admin_home")}
        </Typography>
        <Box
          display="flex"
          sx={{
            justifyContent: "center",
          }}
        >
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
                      <TableRow key={item.id}>
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
          </Stack>
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
                      <TableRow key={index}>
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
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

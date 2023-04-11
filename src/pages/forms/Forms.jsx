import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { format } from "date-fns";
import { useForms } from "../../hooks/UseForms";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UseUser";
import { useTranslation } from "react-i18next";

const Forms = () => {
  const { getForms, deleteForm } = useForms();
  const { getUser } = useUser();
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [Forms, setForms] = useState([]);
  const [valuesChanged, setValuesChanged] = useState(true);
  const [dialogOpenId, setDialogOpenId] = useState(-1);
  const navigate = useNavigate();
  const userRole =
    getUser()?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  useEffect(() => {
    setValuesChanged(false);
    handleGetForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesChanged]);

  const handleGetForms = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      setForms(await getForms());
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (id) => {
    setDialogOpenId(id);
  };

  const handleCloseDialog = () => {
    setDialogOpenId(-1);
  };

  const handleDeleteForm = async (FormId) => {
    try {
      setDialogOpenId(-1);
      setIsLoading(true);
      await deleteForm(FormId);
      setValuesChanged(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        spacing={2}
        sx={{
          maxWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        <Typography variant="h5">{t("form_list")}</Typography>
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            maxWidth: 960,
            overflowX: "auto",
          }}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>{t("name")}</TableCell>
                <TableCell>{t("purpose")}</TableCell>
                <TableCell>{t("form_signed")}</TableCell>
                <TableCell>{t("entrance_time")}</TableCell>
                <TableCell>{t("departure_time")}</TableCell>
                <TableCell>{t("guest_email")}</TableCell>
                <TableCell>{t("wifi_access")}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Forms.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.visitPurpose}</TableCell>
                    <TableCell>
                      {item.signature ? (
                        <label>{t("yes")}</label>
                      ) : (
                        <label>{t("no")}</label>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(item.entranceTime), "MM-dd HH:mm")}
                    </TableCell>
                    <TableCell>
                      {item.departureTime ? (
                        format(new Date(item.departureTime), "MM-dd HH:mm")
                      ) : (
                        <label>{t("not_set")}</label>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.email ? item.email : <label>{t("not_set")}</label>}
                    </TableCell>
                    <TableCell>{item.wifiAccessStatus}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          navigate("/Forms/" + item.id);
                        }}
                      >
                        {t("edit")}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {userRole === "super" ? (
                        <Box>
                          <Button
                            onClick={() => {
                              handleOpenDialog(item.id);
                            }}
                          >
                            {t("delete")}
                          </Button>
                          <Dialog
                            open={dialogOpenId === item.id}
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {t("delete_dialog_conf")}
                              {` "${item.name} ${format(
                                new Date(item.entranceTime),
                                "MM-dd HH:mm"
                              )}"?`}
                            </DialogTitle>
                            <DialogActions>
                              <Button onClick={() => handleCloseDialog()}>
                                {t("no")}
                              </Button>
                              <Button onClick={() => handleDeleteForm(item.id)}>
                                {t("yes")}
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Box>
                      ) : (
                        ""
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/Forms/add");
          }}
        >
          {t("add_form")}
        </Button>
      </Stack>
    </Box>
  );
};

export default Forms;

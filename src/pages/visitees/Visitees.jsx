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
import { useVisitees } from "../../hooks/UseVisitees";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
//import { useError } from "../../context/UseError";

const Visitees = () => {
  //const { setError: setHeaderError } = useError();
  const { getVisitees, deleteVisitee } = useVisitees();
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [visitees, setVisitees] = useState([]);
  const [valuesChanged, setValuesChanged] = useState(true);
  const [dialogOpenId, setDialogOpenId] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    setValuesChanged(false);
    handleGetVisitees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesChanged]);

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

  const handleOpenDialog = (id) => {
    setDialogOpenId(id);
  };

  const handleCloseDialog = () => {
    setDialogOpenId(-1);
  };

  const handleDeleteVisitee = async (visiteeId) => {
    try {
      setDialogOpenId(-1);
      setIsLoading(true);
      await deleteVisitee(visiteeId);
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
        <Typography variant="h5">{t("visitee_list")}</Typography>
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
                <TableCell>{t("email")}</TableCell>
                <TableCell>{t("status")}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visitees.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          navigate("/visitees/" + item.id);
                        }}
                      >
                        {t("edit")}
                      </Button>
                    </TableCell>
                    <TableCell>
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
                          {` "${item.name}"?`}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={() => handleCloseDialog()}>
                            {t("no")}
                          </Button>
                          <Button onClick={() => handleDeleteVisitee(item.id)}>
                            {t("yes")}
                          </Button>
                        </DialogActions>
                      </Dialog>
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
            navigate("/visitees/add");
          }}
        >
          {t("add_visitee")}
        </Button>
      </Stack>
    </Box>
  );
};

export default Visitees;

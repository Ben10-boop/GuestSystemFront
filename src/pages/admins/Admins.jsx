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
import { useAdmins } from "../../hooks/UseAdmins";
import { useNavigate } from "react-router-dom";
import { useError } from "../../context/UseError";
import { useTranslation } from "react-i18next";

const Admins = () => {
  const { setError: setHeaderError } = useError();
  const { getAdmins, deleteAdmin } = useAdmins();
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [valuesChanged, setValuesChanged] = useState(true);
  const [dialogOpenId, setDialogOpenId] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    setValuesChanged(false);
    handleGetAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesChanged]);

  const handleGetAdmins = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      setHeaderError(null);
      setAdmins(await getAdmins());
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

  const handleDeleteAdmin = async (adminId) => {
    try {
      setDialogOpenId(-1);
      setIsLoading(true);
      await deleteAdmin(adminId);
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
        <Typography variant="h5">{t("admin_list")}</Typography>
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
                <TableCell>{t("role")}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          navigate("/admins/" + item.id);
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
                          <Button onClick={() => handleDeleteAdmin(item.id)}>
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
            navigate("/admins/add");
          }}
        >
          {t("add_admin")}
        </Button>
      </Stack>
    </Box>
  );
};

export default Admins;

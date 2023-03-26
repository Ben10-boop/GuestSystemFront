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

const Forms = () => {
  const { getForms, deleteForm } = useForms();
  const { getUser } = useUser();
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
        <Typography variant="h5">Guest form submission list</Typography>
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
                <TableCell>Guest name</TableCell>
                <TableCell>Visit purpose</TableCell>
                <TableCell>Form signed</TableCell>
                <TableCell>Entrance time</TableCell>
                <TableCell>Departure time</TableCell>
                <TableCell>Guest email</TableCell>
                <TableCell>Wifi access</TableCell>
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
                      {item.signature ? <label>yes</label> : <label>no</label>}
                    </TableCell>
                    <TableCell>
                      {format(new Date(item.entranceTime), "MM-dd HH:mm")}
                    </TableCell>
                    <TableCell>
                      {item.departureTime ? (
                        format(new Date(item.departureTime), "MM-dd HH:mm")
                      ) : (
                        <label>not set</label>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.email ? item.email : <label>not given</label>}
                    </TableCell>
                    <TableCell>{item.wifiAccessStatus}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          navigate("/Forms/" + item.id);
                        }}
                      >
                        Edit
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
                            Delete
                          </Button>
                          <Dialog
                            open={dialogOpenId === item.id}
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {`Are you sure you ant to delete the form of "${item.name}"`}
                            </DialogTitle>
                            <DialogActions>
                              <Button onClick={() => handleCloseDialog()}>
                                No
                              </Button>
                              <Button onClick={() => handleDeleteForm(item.id)}>
                                Yes
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
          Add new Form submission
        </Button>
      </Stack>
    </Box>
  );
};

export default Forms;

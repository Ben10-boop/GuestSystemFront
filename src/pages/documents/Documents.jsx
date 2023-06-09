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
import { useDocuments } from "../../hooks/UseDocuments";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Documents = () => {
  const { getDocuments, deleteDocument } = useDocuments();
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [Documents, setDocuments] = useState([]);
  const [valuesChanged, setValuesChanged] = useState(true);
  const [dialogOpenId, setDialogOpenId] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    setValuesChanged(false);
    handleGetDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesChanged]);

  const handleGetDocuments = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      setDocuments(await getDocuments());
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

  const handleDeleteDocument = async (DocumentId) => {
    try {
      setDialogOpenId(-1);
      setIsLoading(true);
      await deleteDocument(DocumentId);
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
        <Typography variant="h5">{t("document_list")}</Typography>
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
                <TableCell>{t("title")}</TableCell>
                <TableCell>{t("status")}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Documents.map((item) => {
                return (
                  <TableRow key={item.id} data-testid={`table_row_${item.id}`}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          navigate("/Documents/" + item.id);
                        }}
                      >
                        {t("edit")}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        data-testid={`table_delete_dialog_btn_${item.id}`}
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
                          {` "${item.title}"?`}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={() => handleCloseDialog()}>
                            {t("no")}
                          </Button>
                          <Button
                            data-testid={`table_delete_conf_btn_${item.id}`}
                            onClick={() => handleDeleteDocument(item.id)}
                          >
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
            navigate("/Documents/add");
          }}
        >
          {t("add_document")}
        </Button>
      </Stack>
    </Box>
  );
};

export default Documents;

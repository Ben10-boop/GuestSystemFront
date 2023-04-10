import { Box, Typography, Alert } from "@mui/material";
import { useError } from "../context/UseError";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { error } = useError();
  const { t } = useTranslation();

  return (
    <Box sx={{ paddingTop: 5 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        sx={{
          bgcolor: "#0b0163",
          height: "10vh",
          bottom: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginLeft: 5 }}
          color="#7567eb"
        >
          {t("guest_reg_system")}
        </Typography>
      </Box>
    </Box>
  );
}

import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GuestHome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  //   {t("")}

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/forms/guestadd");
          }}
          sx={{
            margin: 10,
            padding: 5,
          }}
        >
          {t("begin_visit")}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/forms/endvisit");
          }}
          sx={{
            margin: 10,
          }}
        >
          {t("end_visit")}
        </Button>
      </Box>
    </Box>
  );
};

export default GuestHome;
